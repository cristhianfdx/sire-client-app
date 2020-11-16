import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { GetPartResponse } from '@core/models/response/get-part.response';
import { PartService } from '@core/services/part.service';
import { StockService } from '@core/services/stock.service';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss'],
})
export class StockComponent implements OnInit {
  parts$: Observable<GetPartResponse[]>;
  faSearch = faSearch;

  constructor(
    private partService: PartService,
    private stockService: StockService
  ) {}

  ngOnInit(): void {
    this.getParts();
  }

  getParts(): void {
    this.parts$ = this.partService.getAll();
  }
}
