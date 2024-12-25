import { PartialType } from '@nestjs/swagger';
import { CreateMGDto } from './create-margin_goal.dto';

export class UpdateMGDto extends PartialType(CreateMGDto) {}
