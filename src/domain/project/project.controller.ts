import { Controller, Inject, Post, Req } from '@nestjs/common';
import { ProjectService } from './project.service';

@Controller('project')
export class ProjectController {
  constructor(
    @Inject(ProjectService)
    private readonly projectService: ProjectService,
  ) {}

  @Post('/create')
  public createProject(@Req() req) {
    return this.projectService.createProject({
      name: req.body.name,
    });
  }
}
