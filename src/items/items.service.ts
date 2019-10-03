import { Injectable } from '@nestjs/common';
import { Item } from './interfaces/item.interface';
import { ItemQuery } from './interfaces/item-query.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateItemDto } from './dto/create-item.dto';

@Injectable()
export class ItemsService {
  constructor(@InjectModel('Item') private readonly itemModel:  Model<Item>) {}

  async findAll(query: ItemQuery): Promise<Item[]> {
    return await this.itemModel.find(null, null, this.getOptions(query));
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

  async findAllLikeName(query: ItemQuery): Promise<Item[]> {
    return await this.itemModel.find({ name: new RegExp(query.name, 'i') }, null, this.getOptions(query));
  }

  async findAllByOwner(query: ItemQuery): Promise<Item[]> {
    return await this.itemModel.find({ ownerId: query.ownerId }, null, this.getOptions(query));
  }

  private getOptions(query: ItemQuery): Object {
    let options = { sort: { name: 1 } };
    if (query.limit) options['limit'] = query.limit;
    if (query.skip) options['skip'] = query.skip;
    return options;
  }

}
