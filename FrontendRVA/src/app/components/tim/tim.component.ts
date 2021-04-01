import { Liga } from './../../models/liga';
import { TimService } from './../../services/tim.service';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Tim } from 'src/app/models/tim';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { TimDialogComponent } from '../dialogs/tim-dialog/tim-dialog.component';

@Component({
  selector: 'app-tim',
  templateUrl: './tim.component.html',
  styleUrls: ['./tim.component.css']
})
export class TimComponent implements OnInit {

  displayedColumns = ['id', 'naziv', 'osnovan' , 'sediste', 'nazivLige' , 'actions' ]
  dataSource: MatTableDataSource<Tim>;
  selektovanTim: Tim;

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;


  constructor(private timService: TimService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadData();
  }

  public loadData() {
    this.timService.getAllTim().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);

      this.dataSource.filterPredicate = (data, filter: string) => {
        const accumulator = (currentTerm, key) => {
          return key === 'liga' ? currentTerm + data.nazivLige.naziv : currentTerm + data[key];
        };
        const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
        const transformedFilter = filter.trim().toLowerCase();
        return dataStr.indexOf(transformedFilter) !== -1;
      };

      this.dataSource.sortingDataAccessor = (data, property) => {
        switch (property) {
          case 'liga': return data.nazivLige.naziv.toLocaleLowerCase();
          default: return data[property];
        }
      }
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  public openDialog(flag: number, id?: number, naziv?: string, osnovan?: Date, sediste?: string, liga? : Liga) {
    const dialogRef = this.dialog.open(TimDialogComponent,
      {
      data: {id, naziv, osnovan,sediste, liga }
      });
      dialogRef.componentInstance.flag = flag;

      dialogRef.afterClosed().subscribe(result => {
        if (result === 1){
          this.loadData();
        }
      });
  }
  selectRow(row: any){
    this.selektovanTim = row;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLocaleLowerCase();
    this.dataSource.filter = filterValue;
  }

}
