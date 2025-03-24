import { Component, OnInit, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { CountryLookupService } from './country-lookup.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-world',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './world.component.html',
  styleUrls: ['./world.component.css']
})
export class WorldComponent implements OnInit {
  @ViewChild('svgMap', { static: true }) svgMap!: ElementRef<SVGElement>;
  countryData: any;

  constructor(private renderer: Renderer2, private countryService: CountryLookupService) {}

  ngOnInit(): void {
    this.addEventListeners();
  }

  addEventListeners() {
    const paths = Array.from(this.svgMap.nativeElement.querySelectorAll('path'));

    paths.forEach((path: any) => {
      this.renderer.listen(path, 'click', (event: any) => this.onCountryClick(event));
      this.renderer.listen(path, 'mouseover', (event: any) => this.onCountryHover(event));
    });
  }

  onCountryClick(event: any) {
    const countryCode = event.target.id;
    this.countryService.getCountryData(countryCode).subscribe(data => {
      console.log('Country Data:', data);
      this.countryData = {
        name: data[1][0].name,
        capital: data[1][0].capitalCity,
        region: data[1][0].region.value,
        incomeLevel: data[1][0].incomeLevel.value,
        longitude: data[1][0].longitude,
        latitude: data[1][0].latitude
      };
    });
  }

  onCountryHover(event: any) {
                      
  }
}
