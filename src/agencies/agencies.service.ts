import { Injectable } from "@nestjs/common";
import { Agency } from "src/models/agency.interface";
import { AgencyDto } from "src/models/create-agency.dto";

@Injectable()
export class AgenciesService {
  private readonly agencies: Agency[] = [];
  private readonly STRING_BASE = 36;

  public selectAll(): Agency[] {
    return this.agencies;
  }

  public findById(id: string): Agency {
    return this.agencies.find((agency) => agency.id === id);
  }

  public insert(agency: AgencyDto): Agency {
    const newAgency = {
      id: this.createGUID(),
      ...agency,
    };
    this.agencies.push(newAgency);
    return newAgency;
  }

  private createGUID(): string {
    const timeStamp = Date.now();
    const head = timeStamp.toString(this.STRING_BASE);
    const random = Math.random();
    const decimalPosition = 2;
    const tail = random.toString(this.STRING_BASE).substring(decimalPosition);
    return head + tail;
  }
}