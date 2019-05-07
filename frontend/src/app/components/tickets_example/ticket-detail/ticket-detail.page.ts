import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TicketsService } from '../tickets.service';
import { Ticket } from '../ticket.model';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-ticket-detail',
  templateUrl: './ticket-detail.page.html',
  styleUrls: ['./ticket-detail.page.scss'],
})
export class TicketDetailPage implements OnInit {

  loadedTicket: Ticket;

  constructor(
    private activatedRoute: ActivatedRoute, 
    private ticketsService: TicketsService,
    private router: Router,
    private alertCrtl: AlertController
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if(!paramMap.has('ticketId')){
        this.router.navigate(['/tickets']);
        return;
      }
      const ticketId = paramMap.get('ticketId');
      this.loadedTicket = this.ticketsService.getTicket(ticketId);
    });
  }

  onDeleteTicket() {
    this.alertCrtl.create({
      header: 'Are you sure?',
      message: 'Do you really want to delete the Ticket?',
      buttons : [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Delete',
          handler: () => {
            this.ticketsService.deleteTicket(this.loadedTicket.id);
            this.router.navigate(['/tickets']);
          }
        }
      ]
    }).then(alertEl => {
      alertEl.present();
    });
  }
}
