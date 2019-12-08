import { Injectable } from '@nestjs/common';
import { Item } from './interfaces/item.interface';
import { ItemQuery } from './interfaces/item-query.interface';
import { ItemsPage } from './interfaces/items-page.interface';
import { PageOptions } from './interfaces/page-options.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateItemDto } from './dto/create-item.dto';

@Injectable()
export class ItemsService {
  constructor(@InjectModel('Item') private readonly itemModel: Model<Item>) {}

  async findAll(query: ItemQuery): Promise<ItemsPage> {
    return await this.pageSearch(null, this.getOptions(query));
  }

  async findAllLikeName(query: ItemQuery): Promise<ItemsPage> {
    return await this.pageSearch({ name: new RegExp(query.name, 'i') }, this.getOptions(query));
  }

  async findAllByOwner(query: ItemQuery): Promise<ItemsPage> {
    return await this.pageSearch({ ownerId: query.ownerId }, this.getOptions(query));
  }

  async findAllNotByOwner(query: ItemQuery): Promise<ItemsPage> {
    return await this.pageSearch({ ownerId: { $ne: query.ownerId } }, this.getOptions(query));
  }

  async findOne(id: string): Promise<Item> {
    return await this.itemModel.findOne({ _id: id });
  }

  async create(item: CreateItemDto): Promise<Item> {
    const newItem = new this.itemModel(item);
    return await newItem.save();
  }

  async delete(id: string): Promise<Item> {
    return await this.itemModel.findByIdAndRemove(id);
  }

  async update(id: string, item: Item): Promise<Item> {
    return await this.itemModel.findByIdAndUpdate(id, item, { new: true });
  }

  private async pageSearch(filter: any, options: PageOptions): Promise<ItemsPage> {
    const data = await this.itemModel.find(filter, null, options);
    const total = await this.itemModel.countDocuments(filter);
    const response: ItemsPage = {
      total,
      limit: options.limit,
      skip: options.skip,
      data,
    };
    return response;
  }

  private getOptions(query: ItemQuery): PageOptions {
    const limit = query.limit ? query.limit : 10;
    const skip = query.skip ? query.skip : 0;
    return {
      collation: {
        locale: 'en',
      },
      sort: {
        name: 1,
      },
      limit,
      skip,
    };
  }

}
