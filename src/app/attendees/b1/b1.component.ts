import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-b1',
    templateUrl: './b1.component.html',
    styleUrls: ['../../../assets/css/select-section.css'],
    standalone: false
})
export class B1Component implements OnInit {
    seatRows: any[][] = [];
    selectedSeats: string[] = [];
    reservedSeats: Set<string> = new Set();
    maxSeats = 6;
    rowLabels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    seatsInEachRow = [14, 14, 14, 13, 12]; // Number of seats in each row

    constructor(private router: Router) {}

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
            // Navigate to payment page with selected seats and section as query params
            this.router.navigate(['/payment-1'], { 
                queryParams: { 
                    section: 'B1', 
                    seats: JSON.stringify(this.selectedSeats) 
                }
            });
        } else {
            alert("Please select at least one seat.");
        }
    }
}






