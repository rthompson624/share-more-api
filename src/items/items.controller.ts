import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateItemDto } from './dto/create-item.dto';
import { ItemsService } from './items.service';
import { Item } from './interfaces/item.interface';
import { ItemsPage } from './interfaces/items-page.interface';
import { ItemQuery } from './interfaces/item-query.interface';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll(@Query() queryParams): Promise<ItemsPage> {
    const query = this.getQuery(queryParams);
    if (query.name) {
      return this.itemsService.findAllLikeName(query);
    } else if (query.ownerId && query.type === 'user') {
      return this.itemsService.findAllByOwner(query);
    } else if (query.ownerId && query.type === 'community') {
      return this.itemsService.findAllNotByOwner(query);
    } else {
      return this.itemsService.findAll(query);
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findOne(@Param('id') id): Promise<Item> {
    return this.itemsService.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createItemDto: CreateItemDto): Promise<Item> {
    return this.itemsService.create(createItemDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  delete(@Param('id') id): Promise<Item> {
    return this.itemsService.delete(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  update(@Body() updateItemDto: CreateItemDto, @Param('id') id): Promise<Item> {
    return this.itemsService.update(id, updateItemDto);
  }

  private getQuery(queryParams: any): ItemQuery {
    const query: ItemQuery = {};
    query.limit = queryParams.$limit ? parseInt(queryParams.$limit, 10) : null;
    query.skip = queryParams.$skip ? parseInt(queryParams.$skip, 10) : null;
    query.ownerId = queryParams.ownerId ? queryParams.ownerId : null;
    query.type = queryParams.type ? queryParams.type : null;
    query.name = queryParams.name ? queryParams.name : null;
    query.description = queryParams.description ? queryParams.description : null;
    return query;
  }

}
