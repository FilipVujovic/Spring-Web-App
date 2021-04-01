import { Igrac } from './../../../models/igrac';
import { NacionalnostService } from './../../../services/nacionalnost.service';
import { IgracService } from './../../../services/igrac.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Nacionalnost } from './../../../models/nacionalnost';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-igrac-dialog',
  templateUrl: './igrac-dialog.component.html',
  styleUrls: ['./igrac-dialog.component.css']
})
export class IgracDialogComponent implements OnInit {

  public flag: number;
  nacionalnosti: Nacionalnost[];


  constructor(public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<IgracDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Igrac,
    public igracService: IgracService,
    public nacionalnostService: NacionalnostService
) { }

  ngOnInit(): void {
    this.nacionalnostService.getAllNacionalnost().subscribe(nacionalnosti =>
      this.nacionalnosti = nacionalnosti
    );
  }

  public add(): void {
    this.data.id = -1;
    this.igracService.addIgrac(this.data);
    this.snackBar.open('Uspešno dodat igrac', 'U redu', { duration: 2500 });
  }

  public update(): void {
    this.igracService.updateIgrac(this.data);
    this.snackBar.open('Uspešno modifikovan igrac', 'U redu', { duration: 2500 });
  }

  public delete(): void {
    this.igracService.deleteIgrac(this.data.id);
    this.snackBar.open('Uspešno obrisan igrac', 'U redu', { duration: 2000 });
  }

  public cancel(): void {
    this.dialogRef.close();
    this.snackBar.open('Odustali ste', 'U redu', { duration: 1000 });
  }

  compareTo(a, b) {
    return a.id === b.id;
  }
}
