import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { CreateGroupDto } from './dto/create-group.dto';
import { Group } from './group.entity';
import { GroupsService } from './groups.service';
import { UpdateGroupDto } from './dto/update-group.dto';

@ApiTags('Groups')
@Controller('api/groups')
export class GroupsController {
  constructor(private groupsService: GroupsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  getAllGroups(): Promise<Group[]> {
    return this.groupsService.getAllGroups();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  getGroupById(@Param('id', ParseIntPipe) id: number): Promise<Group> {
    return this.groupsService.getGroupById(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  getGroupByName(name: string): Promise<Group> {
    return this.groupsService.getGroupByName(name);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  createGroup(@Body() createGroupDto: CreateGroupDto): Promise<Group> {
    return this.groupsService.createGroup(createGroupDto);
  }

  // @Put(':id')
  // addUser(@Param('id', ParseIntPipe) id: number, user: User): Promise<Group> {
  //   return this.groupsService.addUser(id, user);
  // }

  //   @UseGuards(AuthGuard('jwt'))
  //   @Put(':group_id')
  //   updateGroup(
  //     @Param('group_id', ParseIntPipe) group_id: number,
  //     @Request() req: any,
  //     @Body() updateGroupDto: UpdateGroupDto,
  //   ): Promise<Group> {
  //     return this.groupsService.updateGroup(group_id, req, updateGroupDto);
  //   }
}
