
import { Component, OnInit } from '@angular/core';
import { Team } from '../team';

import { TeamService } from '../team.service';

@Component({
  selector: 'app-quizoff',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {
  teams: Team[];

  constructor(private teamService: TeamService) { }

  ngOnInit() {
    this.getTeams();
  }

  getTeams(): void {
    this.teamService.getTeams()
        .subscribe(teams => this.teams = teams);
  }

  add(name: string, program: string, eventGroup: string): void {
    name = name.trim();
    if (!name) { return; }
    this.teamService.addTeam({ name, program, eventGroup } as Team)
      .subscribe(() => this.getTeams());
  }

  delete(team: Team): void {
    this.teams = this.teams.filter(h => h !== team);
    this.teamService.deleteTeam(team).subscribe();
  }

}
