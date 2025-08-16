import { Component, OnInit } from '@angular/core';
import { FacturaDto } from '../../models/factura.dto';
import { FacturaService } from '../../services/factura.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Router } from '@angular/router';
import html2pdf from 'html2pdf.js';

@Component({
  selector: 'app-factura',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './factura.component.html',
})
export class FacturaComponent implements OnInit {
  factura!: FacturaDto;
  cargando = true;
  error: string | null = null;

  constructor(
    private facturaService: FacturaService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const pedidoId = Number(this.route.snapshot.paramMap.get('pedidoId'));
    if (pedidoId) {
      this.facturaService.obtenerFacturaPorPedido(pedidoId).subscribe({
        next: (data) => {
          this.factura = data;
          this.cargando = false;

          // Descarga automática después de 3 segundos
          this.descargarFacturaConRetraso();
        },
        error: (err) => {
          this.error = 'No se pudo cargar la factura';
          this.cargando = false;
          console.error('error al cargar factura', err);
        },
      });
    }
  }

  descargarFactura() {
    const contenido = document.getElementById('factura'); // Asegúrate de que la factura esté dentro de un div con id="factura"

    if (contenido) {
      import('html2pdf.js').then((html2pdf) => {
        html2pdf.default().from(contenido).save('Factura.pdf');
      });
    }
  }

  descargarFacturaConRetraso() {
    const contenido = document.getElementById('factura');

    if (contenido) {
      // Esperar 3 segundos antes de iniciar la descarga
      setTimeout(() => {
        html2pdf()
          .from(contenido)
          .set({
            margin: 10,
            filename: 'Factura.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
          })
          .save();
        this.cerrarFactura();
      }, 3000); // 3000 milisegundos = 3 segundos
    }
  }

  cerrarFactura() {
    // Por ejemplo, redirigir al home o a los pedidos
    this.router.navigate(['/']);
  }

  descargarPDF(): void {
    const contenido = document.getElementById('facturaPDF');
    if (!contenido) return;

    html2canvas(contenido).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const width = pdf.internal.pageSize.getWidth();
      const height = (canvas.height * width) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, width, height);
      pdf.save(`factura_${this.factura?.numero || 'pedido'}.pdf`);
    });
  }
}
