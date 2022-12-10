import {MatDialogRef} from '@angular/material/dialog';
import {Component} from '@angular/core';

@Component({
  selector: 'app-add-project-dialog',
  templateUrl: 'add-project-dialog.html',
})
export class AddProjectDialogComponent {
  estimatedCost = 0;
  constructor(public dialogRef: MatDialogRef<AddProjectDialogComponent>) {}
}
