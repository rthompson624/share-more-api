import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateShareDto } from './dto/create-share.dto';
import { SharesService } from './shares.service';
import { Share } from './interfaces/share.interface';

@Controller('shares')
export class SharesController {
  constructor(private readonly sharesService: SharesService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll(@Query() queryParams): Promise<Share[]> {
    // Check for query
    if (queryParams.borrowerId) {
      return this.sharesService.findAllByBorrower(queryParams.borrowerId);
    } else if (queryParams.lenderId) {
      return this.sharesService.findAllByLender(queryParams.lenderId);
    } else {
      // No query
      return this.sharesService.findAll();
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findOne(@Param('id') id): Promise<Share> {
    return this.sharesService.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createShareDto: CreateShareDto): Promise<Share> {
    return this.sharesService.create(createShareDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  delete(@Param('id') id): Promise<Share> {
    return this.sharesService.delete(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  update(@Body() updateShareDto: CreateShareDto, @Param('id') id): Promise<Share> {
    return this.sharesService.update(id, updateShareDto);
  }

}
