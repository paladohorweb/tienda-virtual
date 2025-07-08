import { Component, OnInit } from '@angular/core';
import { FacturaDto } from '../../models/factura.dto';
import { FacturaService } from '../../services/factura.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-factura',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './factura.component.html'

})
export class FacturaComponent implements OnInit {
    factura!: FacturaDto;
    cargando = true;
    error:string | null = null;

    constructor(private facturaService: FacturaService,
      private route: ActivatedRoute
    ){}

    ngOnInit():void{
        const pedidoId = Number (this.route.snapshot.paramMap.get('pedidoId'));
        if (pedidoId) {
              this.facturaService.obtenerFacturaPorPedido(pedidoId).subscribe({
                next:(data) =>{
                  this.factura = data;
                  this.cargando = false;
                },
                error:(err) => {
                  this.error = 'No se pudo cargar la factura';
                  this.cargando = false;
                  console.error('error al cargar factura', err);
                }
              });
        }

    }

      descargarPDF(): void {
    const contenido = document.getElementById('facturaPDF');
    if (!contenido) return;

    html2canvas(contenido).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const width = pdf.internal.pageSize.getWidth();
      const height = (canvas.height * width) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, width, height);
      pdf.save(`factura_${this.factura?.numero || 'pedido'}.pdf`);
    });
  }

}
