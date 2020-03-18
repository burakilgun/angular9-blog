import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  search(searchText) {
    if (!searchText) return false;

    this.router.navigateByUrl(`/arama/sayfa/1?s=${searchText}`);
  }

}
