import { PartialType } from '@nestjs/mapped-types';
import { CreateShopPackageDto } from './create-shop_package.dto';

export class UpdateShopPackageDto extends PartialType(CreateShopPackageDto) {}
