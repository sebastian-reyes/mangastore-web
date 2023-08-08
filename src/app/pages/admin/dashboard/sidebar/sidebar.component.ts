import { Component, OnInit } from '@angular/core';
import { faBook, faHome } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  iconHome = faHome;
  iconVolumenes = faBook

  constructor() { }

  ngOnInit(): void {
  }

}
