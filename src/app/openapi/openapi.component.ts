import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-openapi',
  templateUrl: './openapi.component.html',
  styleUrls: ['./openapi.component.scss']
})
export class OpenapiComponent implements OnInit {

	constructor(private router: Router) {}

	ngOnInit() {
		this.router.config.forEach((route) => {
			console.log(route);
		});
		// this.router.routes.forEach((route: Route) => {
		// 	console.log(route);
		// });



	}

}
