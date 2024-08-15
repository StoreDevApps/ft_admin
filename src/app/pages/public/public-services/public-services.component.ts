import { Component } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { AccordionModule } from 'primeng/accordion';
import { PanelModule } from 'primeng/panel';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-public-services',
  standalone: true,
  imports: [DropdownModule, AccordionModule, PanelModule, CardModule, ButtonModule],
  templateUrl: './public-services.component.html',
  styleUrl: './public-services.component.scss'
})
export class PublicServicesComponent {
  bankOptions = [
    { label: 'Banco Pichincha', value: 'Banco Pichincha' },
    { label: 'Banco Guayaquil', value: 'Banco Guayaquil' },
    { label: 'Banco del Pacífico', value: 'Banco del Pacífico' }
  ];

}
