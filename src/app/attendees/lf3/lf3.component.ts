import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lf3',
  templateUrl: './lf3.component.html',
  styleUrls: ['../../../assets/css/select-section.css']
})
export class Lf3Component implements OnInit {
  seatRows: any[][] = [];
  selectedSeats: string[] = [];
  reservedSeats: Set<string> = new Set();
  maxSeats = 6;
  rowLabels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  seatsInEachRow = [8, 9, 11, 12, 12, 12, 12, 11, 10, 8, 5]; // Number of seats in each row

  ngOnInit() {
      this.initializeSeats();
      this.markReservedSeats();
  }

  initializeSeats() {
      for (let i = 0; i < this.seatsInEachRow.length; i++) {
          this.seatRows.push(Array(this.seatsInEachRow[i]).fill(null));
      }
  }

  markReservedSeats() {
      let reservedCount = 0;
      const totalSeats = this.seatsInEachRow.reduce((acc, val) => acc + val, 0);

      while (reservedCount < Math.floor(totalSeats * 0.15)) {
          const rowIndex = Math.floor(Math.random() * this.seatsInEachRow.length);
          const seatIndex = Math.floor(Math.random() * this.seatsInEachRow[rowIndex]);
          const seatLabel = this.getSeatLabel(rowIndex, seatIndex);

          if (!this.reservedSeats.has(seatLabel)) {
              this.reservedSeats.add(seatLabel);
              reservedCount++;
          }
      }
  }

  getSeatLabel(rowIndex: number, seatIndex: number): string {
      return `${this.rowLabels[rowIndex]}${seatIndex + 1}`;
  }

  isReserved(rowIndex: number, seatIndex: number): boolean {
      const seatLabel = this.getSeatLabel(rowIndex, seatIndex);
      return this.reservedSeats.has(seatLabel);
  }

  isSelected(rowIndex: number, seatIndex: number): boolean {
      const seatLabel = this.getSeatLabel(rowIndex, seatIndex);
      return this.selectedSeats.includes(seatLabel);
  }

  toggleSeat(rowIndex: number, seatIndex: number) {
      const seatLabel = this.getSeatLabel(rowIndex, seatIndex);

      if (this.isReserved(rowIndex, seatIndex)) return;

      const isSelected = this.selectedSeats.includes(seatLabel);

      if (isSelected) {
          this.selectedSeats = this.selectedSeats.filter(s => s !== seatLabel);
      } else {
          if (this.selectedSeats.length < this.maxSeats) {
              this.selectedSeats.push(seatLabel);
          }
      }
  }

  clearSelection() {
      this.selectedSeats = [];
  }

  proceedSelection() {
      if (this.selectedSeats.length > 0) {
          alert("You have selected seats: " + this.selectedSeats.join(", "));
      }
  }


}
