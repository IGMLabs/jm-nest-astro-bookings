import { Body, Controller, Get, Param, Post, UseGuards, ValidationPipe } from "@nestjs/common";
import { AgencyDto } from "src/models/create-agency.dto";
import { AgenciesService } from "./agencies.service";
import { ApiKeyGuard } from "./api-key.guard";
import { Agency } from "./dto/agency.entity";

@Controller("agencies")
@UseGuards(ApiKeyGuard)
export class AgenciesController {
  constructor(private readonly agenciesService: AgenciesService) {}

  @Get()
  public async getAll(): Promise<Agency[]> {
    return await this.agenciesService.selectAll();
  }

  @Get("/:id")
  public async getById(@Param("id") id: string): Promise<Agency> {
    return await this.agenciesService.findById(id);
  }

  @Post()
  public async postAgency(
    @Body(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    )
    agency: AgencyDto,
  ): Promise<Agency> {
    return await this.agenciesService.insert(agency);
  }
}