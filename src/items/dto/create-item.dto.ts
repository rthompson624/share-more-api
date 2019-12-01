export class CreateItemDto {
  readonly ownerId: string;
  readonly name: string;
  readonly description: string;
  readonly picUrl?: string;
}
