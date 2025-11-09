import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hr-leaves',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './leaves.html',
  styleUrls: ['./leaves.css']
})
export class HRLeavesComponent implements OnInit {
  leaveRequests: any[] = [];

  ngOnInit(): void {
    this.loadLeaves();

    // Watch for changes (when employees submit)
    window.addEventListener('storage', () => this.loadLeaves());
  }

  loadLeaves() {
    const allLeaves = JSON.parse(localStorage.getItem('leaves') || '[]');
    this.leaveRequests = allLeaves;
  }

  approveLeave(id: number) {
    this.updateStatus(id, 'Approved');
  }

  rejectLeave(id: number) {
    this.updateStatus(id, 'Rejected');
  }

  updateStatus(id: number, status: string) {
    let allLeaves = JSON.parse(localStorage.getItem('leaves') || '[]');
    allLeaves = allLeaves.map((l: any) => {
      if (l.id === id) l.status = status;
      return l;
    });

    localStorage.setItem('leaves', JSON.stringify(allLeaves));
    this.leaveRequests = allLeaves;
    alert(`✅ Leave ${status.toLowerCase()} successfully!`);
  }
}
