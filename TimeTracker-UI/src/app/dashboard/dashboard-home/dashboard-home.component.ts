import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {ProjectModel} from '../project.model';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {AddProjectDialogComponent} from '../add-project-dialog/add-project-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {animate, state, style, transition, trigger} from '@angular/animations';


const ELEMENT_DATA: ProjectModel[] = [
  {title: 'Tidal park', client: 'MVC Constructions', chargePerHour: 50, hoursEstimated: 70, hoursSpent: 89},
  {title: 'Tidal park', client: 'MVC Constructions', chargePerHour: 50, hoursEstimated: 70, hoursSpent: 89},
  {title: 'Tidal park', client: 'MVC Constructions', chargePerHour: 50, hoursEstimated: 70, hoursSpent: 89},
  {title: 'Tidal park', client: 'MVC Constructions', chargePerHour: 50, hoursEstimated: 70, hoursSpent: 89},
  {title: 'Tidal park', client: 'MVC Constructions', chargePerHour: 50, hoursEstimated: 70, hoursSpent: 89},
  {title: 'Tidal park', client: 'MVC Constructions', chargePerHour: 50, hoursEstimated: 70, hoursSpent: 89},
  {title: 'Tidal park', client: 'MVC Constructions', chargePerHour: 50, hoursEstimated: 70, hoursSpent: 89},
  {title: 'Tidal park', client: 'MVC Constructions', chargePerHour: 50, hoursEstimated: 70, hoursSpent: 89},
  {title: 'Tidal park', client: 'MVC Constructions', chargePerHour: 50, hoursEstimated: 70, hoursSpent: 89},
  {title: 'Tidal park', client: 'MVC Constructions', chargePerHour: 50, hoursEstimated: 70, hoursSpent: 89},
  {title: 'Tidal park', client: 'MVC Constructions', chargePerHour: 50, hoursEstimated: 70, hoursSpent: 89},
  {title: 'Tidal park', client: 'MVC Constructions', chargePerHour: 50, hoursEstimated: 70, hoursSpent: 89},
  {title: 'Tidal park', client: 'MVC Constructions', chargePerHour: 50, hoursEstimated: 70, hoursSpent: 89},
  {title: 'Tidal park', client: 'MVC Constructions', chargePerHour: 50, hoursEstimated: 70, hoursSpent: 89},
];

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class DashboardHomeComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['title', 'client', 'chargePerHour', 'hoursEstimated', 'hoursSpent'];
  dataSource: MatTableDataSource<ProjectModel>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  isLoadingResults = false;
  columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];
  expandedElement: ProjectModel | null;


  constructor(public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource(ELEMENT_DATA);
  }

  ngOnInit(): void {
    this.loadProjectData();
  }


  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadProjectData(): void {

  }

  applyFilter($event: KeyboardEvent): void {
    const filterValue = ($event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialog(): void {
    this.dialog.open(AddProjectDialogComponent);
  }
}
