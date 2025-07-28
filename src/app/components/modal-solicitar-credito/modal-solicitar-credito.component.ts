import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SolicitarCreditoComponent } from '../../pages/solicitar-credito/solicitar-credito.component';

@Component({
  selector: 'app-modal-solicitar-credito',
  standalone: true,
  imports: [CommonModule, SolicitarCreditoComponent],
  templateUrl: './modal-solicitar-credito.component.html',
})
export class ModalSolicitarCreditoComponent {
  @Input() productoId!: number;
 @Input() precioProducto!: number;
 
}
