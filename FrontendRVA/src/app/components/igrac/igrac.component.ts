import { IgracDialogComponent } from './../dialogs/igrac-dialog/igrac-dialog.component';
import { Nacionalnost } from './../../models/nacionalnost';
import { Tim } from './../../models/tim';
import { IgracService } from './../../services/igrac.service';
import { Igrac } from './../../models/igrac';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-igrac',
  templateUrl: './igrac.component.html',
  styleUrls: ['./igrac.component.css']
})
export class IgracComponent implements OnInit , OnChanges {

  displayedColumns = ['id', 'ime', 'prezime', 'broj_reg', 'datum_rodjenja', 'actions'];
  dataSource: MatTableDataSource<Igrac>;

  @Input() selektovanTim: Tim;

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  constructor( public igracService: IgracService, public dialog: MatDialog ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.selektovanTim.id) {
      debugger;
      this.loadData();
    }
  }

  ngOnInit(): void {

  }



  public loadData() {
    /*this.igracService.getAllIgrac().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })*/
   this.igracService.getIgracZaTim(this.selektovanTim.id).subscribe(data => {
      this.dataSource = new MatTableDataSource(data);

      this.dataSource.filterPredicate = (data, filter: string) => {
        const accumulator = (currentTerm, key) => {
          return key === 'nacionalnost' ? currentTerm + data.nacionalnost.naziv : currentTerm + data[key];
        };
        const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
        const transformedFilter = filter.trim().toLowerCase();
        return dataStr.indexOf(transformedFilter) !== -1;
      };
      this.dataSource.sortingDataAccessor = (data, property) => {
        switch (property) {
          case 'nacionalnost': return data.nacionalnost.naziv.toLocaleLowerCase();
          default: return data[property];
        }
      };
    });
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
  };

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLocaleLowerCase();
    this.dataSource.filter = filterValue;
  }

public openDialog(flag: number, id?: number, ime?: string, prezime?: string, broj_reg?: number,
    datum_rodjenja?: Date, nacionalnost?: Nacionalnost, tim?: Tim) {
const dialogRef = this.dialog.open(IgracDialogComponent, {
data: {i: id, id, ime, prezime, broj_reg,
datum_rodjenja, nacionalnost, tim
}
});
dialogRef.componentInstance.flag = flag;
if (flag === 1) {
dialogRef.componentInstance.data.tim = this.selektovanTim;
}

dialogRef.afterClosed().subscribe(result => {
if (result === 1) {
this.loadData();
}
});
}

}
