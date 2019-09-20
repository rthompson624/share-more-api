import { Injectable } from '@nestjs/common';
import { Share } from './interfaces/share.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateShareDto } from './dto/create-share.dto';

@Injectable()
export class SharesService {
  constructor(@InjectModel('Share') private readonly shareModel:  Model<Share>) {}

  async findAll(): Promise<Share[]> {
    return await this.shareModel.find();
  }
 
  async findOne(id: string): Promise<Share> {
    return await this.shareModel.findOne({ _id: id });
  }
 
  async create(share: CreateShareDto): Promise<Share> {
    const newShare = new this.shareModel(share);
    return await newShare.save();
  }
 
  async delete(id: string): Promise<Share> {
    return await this.shareModel.findByIdAndRemove(id);
  }
 
  async update(id: string, share: Share): Promise<Share> {
    return await this.shareModel.findByIdAndUpdate(id, share, { new: true });
  }

  async findAllByBorrower(borrowerId: string): Promise<Share[]> {
    return await this.shareModel.find({ borrowerId: borrowerId });
  }

  async findAllByLender(lenderId: string): Promise<Share[]> {
    return await this.shareModel.find({ lenderId: lenderId });
  }

}
