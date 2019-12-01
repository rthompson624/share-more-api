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
    // Check for field queries
    if (queryParams.name) {
      return this.itemsService.findAllLikeName(this.getQuery(queryParams));
    } else if (queryParams.ownerId) {
      return this.itemsService.findAllByOwner(this.getQuery(queryParams));
    } else {
      return this.itemsService.findAll(this.getQuery(queryParams));
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
    query.name = queryParams.name ? queryParams.name : null;
    query.description = queryParams.description ? queryParams.description : null;
    return query;
  }

}
