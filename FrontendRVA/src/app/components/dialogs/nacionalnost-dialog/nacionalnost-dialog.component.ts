import { Nacionalnost } from './../../../models/nacionalnost';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { NacionalnostService } from './../../../services/nacionalnost.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-nacionalnost-dialog',
  templateUrl: './nacionalnost-dialog.component.html',
  styleUrls: ['./nacionalnost-dialog.component.css']
})
export class NacionalnostDialogComponent implements OnInit {

  public flag: number;


  constructor(public nacionalnostService: NacionalnostService,
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<NacionalnostDialogComponent>,
    @Inject (MAT_DIALOG_DATA) public data: Nacionalnost
    ) { }

  ngOnInit(): void {
  }
  //Potvrdi
  public add(): void {
    this.nacionalnostService.addNacionalnost(this.data);
    this.snackBar.open('Uspesno dodata nacionalnost: ' + this.data.naziv, 'U redu', {
      duration: 2500
    });
  }

  public update(): void {
    this.nacionalnostService.updateNacionalnost(this.data);
    this.snackBar.open('Uspesno modifikovana nacionalnost: ' + this.data.naziv, 'U redu', {
      duration: 2500
    });
  }

  public delete(): void {
    this.nacionalnostService.deleteNacionalnost(this.data.id);
    this.snackBar.open('Uspesno obrisana nacionalnost: ' + this.data.naziv, 'U redu', {
      duration: 2500
    });
  }

  //Odustani

  public cancel(): void {
    this.dialogRef.close();
    this.snackBar.open('Kaput' ,'U redu', {
      duration: 500
    });
  }

}
