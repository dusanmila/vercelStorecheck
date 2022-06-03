import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AreYouSureDialogComponent } from 'src/app/dialogs/are-you-sure-dialog/are-you-sure-dialog.component';
import { EmailDialogComponent } from 'src/app/dialogs/email-dialog/email-dialog.component';
import { Obj } from 'src/app/models/object';
import { StoreCheck } from 'src/app/models/storeCheck';
import { ObjectService } from 'src/app/Services/object.service';
import { StoreCheckService } from 'src/app/Services/store-check.service';

@Component({
  selector: 'app-choose-object',
  templateUrl: './choose-object.component.html',
  styleUrls: ['./choose-object.component.css']
})
export class ChooseObjectComponent implements OnInit {

  public objects: Obj[] = [];
  public resolveFeedbacks: boolean;
  public workModel: string;
  public storeCheck: StoreCheck;

  constructor(public objectService: ObjectService,
    public activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
    public storeCheckService: StoreCheckService,
    public router: Router) { }

  ngOnInit(): void {
    this.workModel = this.activatedRoute.snapshot.paramMap.get("workModel") as string;
    if (this.workModel == "addStoreCheck") {
      this.resolveFeedbacks = false;
    } else if (this.workModel == "resolveFeedbacks") {
      this.resolveFeedbacks = true;
    }
    if (!this.resolveFeedbacks) {
      this.loadStoreCheck();
    }
  }

  public loadStoreCheck() {
    this.storeCheckService.getUnfinishedStoreCheckByUsername("ppetrovic").subscribe(data => {
      this.storeCheck = data;
      if (!this.storeCheck) {
        this.createEmptyStoreCheck();
      }
    });
  }

  public createEmptyStoreCheck() {
    console.log('create empty store check');
    let sc: StoreCheck = {
      username: "ppetrovic",
      date: new Date(Date.now()),
      finished: false
    }
    this.storeCheckService.createStoreCheck(sc).subscribe(data => {
      console.log(data);
    });
  }

  public openDialog() {
    const dialogRef = this.dialog.open(EmailDialogComponent);
    dialogRef.afterClosed()
      .subscribe(res => {
        if (res === 1) {
        }
      }
      )
  }

  public exit() {
    const dialogRef = this.dialog.open(AreYouSureDialogComponent);
    dialogRef.afterClosed()
      .subscribe(res => {
        console.log(res)
        if (res) {
          this.router.navigate(['/storeCheck']);
        }
      }
      )
  }

}
