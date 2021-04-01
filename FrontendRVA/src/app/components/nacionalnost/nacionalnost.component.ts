import { NacionalnostDialogComponent } from './../dialogs/nacionalnost-dialog/nacionalnost-dialog.component';
import { NacionalnostService } from './../../services/nacionalnost.service';
import { Nacionalnost } from './../../models/nacionalnost';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-nacionalnost',
  templateUrl: './nacionalnost.component.html',
  styleUrls: ['./nacionalnost.component.css']
})
export class NacionalnostComponent implements OnInit {


  displayedColumns = ['id', 'naziv', 'skracenica', 'actions'];
  dataSource: MatTableDataSource<Nacionalnost>;

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  constructor(private nacionalnostService: NacionalnostService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadData();
  }

  /*
    Svaki put kada nam nas stream vrati podatak
    Taj podatak ide kao novi red u nasem dataSource
    Odnosno u nasoj tabeli
  */
  public loadData() {
    this.nacionalnostService.getAllNacionalnost().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  //Opcioni parametri sa ?
  public openDialog(flag: number, id?: number, naziv?: string, skracenica?: string) {
    const dialogRef = this.dialog.open(NacionalnostDialogComponent,
      {
      data: {id, naziv, skracenica}
      });
      dialogRef.componentInstance.flag = flag;

      dialogRef.afterClosed().subscribe(result => {
        if (result === 1){
          this.loadData();
        }
      });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLocaleLowerCase();
    this.dataSource.filter = filterValue;
  }

}
