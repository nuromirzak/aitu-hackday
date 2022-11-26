import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map-page',
  templateUrl: './map-page.component.html',
  styleUrls: ['./map-page.component.scss']
})
export class MapPageComponent implements OnInit {
  shopAddresses;


  constructor() {
    
    this.shopAddresses = [
      {
          address: 'г. Астана, ул. Бейбитшилик, 33',
          coordinate: { lng: '71.418203', lat: '51.175314' }
      }
      ,
      {
          address: 'г. Астана, ул. Ж.Жирентаева, 7',
          coordinate: { lng: '71.47371', lat: '51.150439' }
      }
      ,
      {
          address: 'г. Астана, ул. Шоқан Уәлиханов, 20',
          coordinate: { lng: '71.439933', lat: '51.172197' }
      }
      ,
      {
          address: 'г. Астана, пр. Б. Момышулы, 10',
          coordinate: { lng: '71.476064', lat: '51.138963' }
      }
      ,
      {
          address: 'г. Астана, ул. Достык, 10',
          coordinate: { lng: '71.423081', lat: '51.126308' }
      }
      ,
      {
          address: 'г. Астана, ул. Кабанбай батыра, 21',
          coordinate: { lng: '71.411529', lat: '51.128066' }
      }
      ,
      {
          address: ' г. Астана, пр. Б.Момышулы, 19а',
          coordinate: { lng: '71.475471', lat: '51.139686' }
      }
      ,
      {
          address: 'г. Астана, пр. Республики, 16',
          coordinate: { lng: '71.428974', lat: '51.161432' }
      }
      ,
      {
          address: 'г. Астана, пр. Абылайхана, 29',
          coordinate: { lng: '71.43042', lat: '51.128207' }
      }
      ,
      {
          address: 'г. Астана, пр. Мәңгілік Ел, 19',
          coordinate: { lng: '71.43281', lat: '51.114373' }
      }
      ,
      {
          address: 'г. Астана, ул. Қаныш Сәтбаев, 15',
          coordinate: { lng: '71.47124', lat: '51.146721' }
      }
  ]

  }

  ngOnInit(): void {
  }

  showAlert(coordinate) {
    console.log(coordinate.address)
  }

}
