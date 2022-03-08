import { HttpClient } from "@angular/common/http";
import { Component, ViewChild } from "@angular/core";
import { first } from "rxjs/operators";

@Component({
  selector: "app-test",
  templateUrl: "./test.component.html"
})
export class TestComponent {
  constructor(private http: HttpClient) {}

  @ViewChild("mainFormio")
  mainFormio;

  initialSubmission = {
    spolka: "string",
    numerFaktury: 0,
    dataDostarczenia: "2022-03-08T00:00:00.000Z",
    dataDostarczenia3: "2022-03-08T00:00:00.000Z",
    dostawca: "string",
    miejscePrzyjecia: "string",
    dataDostarczenia1: "2022-03-08T00:00:00.000Z",
    dataDostarczenia2: "2022-03-08T00:00:00.000Z",
    nipDostawcy: "string",
    faktura: "papierowa",
    status: "string",
    wartoscBrutto: "string",
    grupa: "string",
    typPlatnosci: "string",
    waluta: "string",
    typ: "string",
    rodzaj: ["string"],
    opis: "string",
    requestId: "string",
    projekt: "string",
    lokalizacja: "string",
    centrumKosztowe: "string",
    rickAndMortySelect: "string",
    numerDelegacji: "string",
    numerRejestracyjny: "string",
    extraFields: "string"
  };

  title = "CodeSandbox";
  withComments = false;
  withAttachments = false;
  scheme: any;
  customScheme: any;
  log(...data) {
    console.log(...data);
  }
  ngOnInit() {
    this.http
      .get(" https://jlhoihrgfvgavqi.form.io/kontrolaformalnorachunkowa")
      .pipe(first())
      .subscribe((data) => {
        this.scheme = data as any;
        let extraFieldsComponent = data.components[data.components.length - 1];
        if (extraFieldsComponent.label === "Extra fields") {
          if (extraFieldsComponent.defaultValue.indexOf("comments") !== -1) {
            this.withComments = true;
          }
          if (extraFieldsComponent.defaultValue.indexOf("attachments") !== -1) {
            this.withAttachments = true;
          }
        }
        this.log(data);
        this.customScheme = this.filterUslessFields(this.scheme);
      });
  }

  ngAfterViewInit() {
    console.log("Main Formio: ", this.mainFormio);
  }

  filterUslessFields(scheme) {
    const resultScheme = scheme;
    delete resultScheme.tags;
    delete resultScheme.revisions;
    delete resultScheme.controller;
    delete resultScheme.properties;
    delete resultScheme.settings;
    delete resultScheme._vid;
    delete resultScheme.access;
    delete resultScheme.submissionAccess;
    let componentSubmit = resultScheme.components.find(
      (el) => el.key === "submit"
    );
    componentSubmit.disableOnInvalid = false;
    resultScheme.components[
      resultScheme.components.indexOf((el) => el.key === "submit")
    ] = componentSubmit;
    this.log("po usunięciu tag i revisions:", resultScheme);
    return resultScheme;
  }

  submit(data) {
    this.log(data);
  }

  initialObj = {
    _id: "62223a8103e7e87f406eb55f",
    type: "form",
    tags: [],
    owner: "62220ad603e7e8d52768b306",
    components: [
      {
        title: "Kontrola formalno-rachunkowa",
        collapsible: true,
        key: "kontrolaFormalnoRachunkowa",
        type: "panel",
        label: "Panel",
        input: false,
        tableView: false,
        components: [
          {
            label: "Columns",
            columns: [
              {
                components: [
                  {
                    label: "Spółka",
                    widget: "choicesjs",
                    tableView: true,
                    dataSrc: "json",
                    data: {
                      json: [
                        {
                          label: "Onwelo S.A",
                          value: "onweloSA"
                        },
                        {
                          label: "Onwelo Services oddział CHF",
                          value: "onweloServicesOddzialChf"
                        },
                        {
                          label: "Onwelo Services sp. z o.o.",
                          value: "onweloServicesSpZOO"
                        }
                      ]
                    },
                    dataType: "string",
                    valueProperty: "value",
                    validate: {
                      required: true
                    },
                    key: "spolka",
                    type: "select",
                    input: true
                  }
                ],
                width: 6,
                offset: 0,
                push: 0,
                pull: 0,
                size: "md",
                currentWidth: 6
              },
              {
                components: [],
                width: 6,
                offset: 0,
                push: 0,
                pull: 0,
                size: "md",
                currentWidth: 6
              }
            ],
            key: "columns1",
            type: "columns",
            input: false,
            tableView: false
          },
          {
            label: "Columns",
            columns: [
              {
                components: [
                  {
                    label: "Numer faktury",
                    mask: false,
                    tableView: false,
                    delimiter: false,
                    requireDecimal: false,
                    inputFormat: "plain",
                    truncateMultipleSpaces: false,
                    validate: {
                      required: true
                    },
                    key: "numerFaktury",
                    type: "number",
                    input: true
                  },
                  {
                    label: "Data dostarczenia",
                    placeholder: "rrrr-mm-dd",
                    tableView: false,
                    datePicker: {
                      disableWeekends: false,
                      disableWeekdays: false
                    },
                    validate: {
                      required: true
                    },
                    enableMinDateInput: false,
                    enableMaxDateInput: false,
                    key: "dataDostarczenia",
                    type: "datetime",
                    input: true,
                    widget: {
                      type: "calendar",
                      displayInTimezone: "viewer",
                      locale: "en",
                      useLocaleSettings: false,
                      allowInput: true,
                      mode: "single",
                      enableTime: true,
                      noCalendar: false,
                      format: "yyyy-MM-dd hh:mm a",
                      hourIncrement: 1,
                      minuteIncrement: 1,
                      time_24hr: false,
                      minDate: null,
                      disableWeekends: false,
                      disableWeekdays: false,
                      maxDate: null
                    }
                  },
                  {
                    label: "Data wystawienia",
                    placeholder: "rrrr-mm-dd",
                    tableView: false,
                    datePicker: {
                      disableWeekends: false,
                      disableWeekdays: false
                    },
                    validate: {
                      required: true
                    },
                    enableMinDateInput: false,
                    enableMaxDateInput: false,
                    key: "dataDostarczenia3",
                    type: "datetime",
                    input: true,
                    widget: {
                      type: "calendar",
                      displayInTimezone: "viewer",
                      locale: "en",
                      useLocaleSettings: false,
                      allowInput: true,
                      mode: "single",
                      enableTime: true,
                      noCalendar: false,
                      format: "yyyy-MM-dd hh:mm a",
                      hourIncrement: 1,
                      minuteIncrement: 1,
                      time_24hr: false,
                      minDate: null,
                      disableWeekends: false,
                      disableWeekdays: false,
                      maxDate: null
                    }
                  },
                  {
                    label: "Dostawca",
                    widget: "choicesjs",
                    tableView: true,
                    dataSrc: "json",
                    data: {
                      json: [
                        {
                          data: {
                            sapNumber: "123456789",
                            name: "Guns'n Roses Emily Rose",
                            address: "Słowackiego 15 34300 Żywiec Poland",
                            country: "Polska",
                            vatId: "5532451160"
                          },
                          version: 0,
                          id: "6b260992-7339-4826-aa3e-27473895c2cf"
                        },
                        {
                          data: {
                            sapNumber: "1299",
                            name: "Najlepsza firma",
                            address: "PL",
                            country: "PL",
                            vatId: "9999999998"
                          },
                          version: 1,
                          id: "8dba5883-4c59-420d-b6ac-b0494d14e51c"
                        },
                        {
                          data: {
                            sapNumber: "3000000",
                            name: "ABC SPÓŁKA Z OGRANIC ODPOWIEDZIALNOŚCIĄ",
                            address: "",
                            country: "PL",
                            vatId: "0123456789"
                          },
                          version: 0,
                          id: "2f225dcc-7321-496d-bdc6-2d52acd2cdbf"
                        },
                        {
                          data: {
                            sapNumber: "3000001",
                            name:
                              "DOBRA FIRMA SPÓŁKA Z OGRANICZONĄ ODPOWIEDZIALNOŚCIĄ",
                            address: "",
                            country: "PL",
                            vatId: "1234567890"
                          },
                          version: 0,
                          id: "a38c962a-8288-4c7e-85c6-0d41b8226fe7"
                        },
                        {
                          data: {
                            sapNumber: "3000002",
                            name:
                              "SOLIDNA FIRMA SPÓŁKA Z OGRANICZONĄ ODPOWIEDZIALNOŚCIĄ SPÓŁKA K",
                            address: "",
                            country: "PL",
                            vatId: "2345678901"
                          },
                          version: 0,
                          id: "dba3d567-8f55-4199-902e-67e904103625"
                        },
                        {
                          data: {
                            sapNumber: "3000003",
                            name:
                              "COMPANY SPÓŁKA Z OGRANICZONĄ ODPOWIEDZIALNOŚCIĄ",
                            address: "",
                            country: "PL",
                            vatId: "3456789012"
                          },
                          version: 0,
                          id: "2e78855d-12f7-4ef9-96d8-114c40552d9a"
                        },
                        {
                          data: {
                            sapNumber: "3000004",
                            name: "AIRLINES KONSORCJUM",
                            address: "",
                            country: "PL",
                            vatId: "4567890123"
                          },
                          version: 0,
                          id: "87b60d35-e4ea-4066-9978-4cd0bebdf877"
                        },
                        {
                          data: {
                            sapNumber: "3000005",
                            name: "KOMTECH SPÓŁKA AKCYJNA",
                            address: "",
                            country: "PL",
                            vatId: "5678901234"
                          },
                          version: 0,
                          id: "970611f6-77ad-4917-935e-862670719e1c"
                        },
                        {
                          data: {
                            sapNumber: "3000006",
                            name: "NETWORK SPÓŁKA AKCYJNA",
                            address: "",
                            country: "PL",
                            vatId: "6789012345"
                          },
                          version: 0,
                          id: "61f642b3-2fd7-4a33-9eb1-90588f807de3"
                        },
                        {
                          data: {
                            sapNumber: "3000007",
                            name:
                              "MY E-COMMERCE SPÓŁKA Z OGRANICZONĄ ODPOWIEDZIALNOŚCIĄ",
                            address: "",
                            country: "PL",
                            vatId: "7890123456"
                          },
                          version: 0,
                          id: "ac9e2c50-db66-4261-842a-07c62ba8c7b5"
                        },
                        {
                          data: {
                            sapNumber: "3000008",
                            name:
                              "ART BIUROWE Z OGRANICZONĄ ODPOWIEDZIALNOŚCIĄ",
                            address: "",
                            country: "PL",
                            vatId: "8901234567"
                          },
                          version: 0,
                          id: "76a50227-2506-4b06-8feb-16af9ccad4af"
                        },
                        {
                          data: {
                            sapNumber: "3000009",
                            name: "JAN KOWALSKI",
                            address: "",
                            country: "PL",
                            vatId: "9012345678"
                          },
                          version: 0,
                          id: "a53e37a3-0cd2-4d2b-b5df-0567d4c6697b"
                        },
                        {
                          data: {
                            sapNumber: "33434333",
                            name: "Karolina Wesołowska ",
                            address: "test",
                            country: "Polska ",
                            vatId: "83838388383"
                          },
                          version: 2,
                          id: "9b343ec2-8eb5-44fe-9753-4d79a8672ad4"
                        },
                        {
                          data: {
                            sapNumber: "PL3853489534",
                            name: "Firma sp. z o.o.",
                            address: "99-921 Gorzów Wielkopolski leśna 69",
                            country: "Polska",
                            vatId: "6714985459"
                          },
                          version: 4,
                          id: "ee797e3d-5052-44fe-bfb4-fb97d7ccc21a"
                        },
                        {
                          data: {
                            sapNumber: "SAP12345",
                            name: "Test Name",
                            address: "Baker Street 221b 22-121",
                            country: "United Kingdom",
                            vatId: "1234567890"
                          },
                          version: 1,
                          id: "657f2c81-38cc-4b72-8d9a-3faea4abec19"
                        },
                        {
                          data: {
                            sapNumber: null,
                            name: "Dostawca testowy z HA",
                            address: null,
                            country: null,
                            vatId: "5532451160"
                          },
                          version: 0,
                          id: "8c997218-4e87-47e1-a224-68ccdf145042"
                        },
                        {
                          data: {
                            sapNumber: null,
                            name: "Company sp. z o.o.",
                            address: null,
                            country: null,
                            vatId: "5532451160"
                          },
                          version: 1,
                          id: "5a3e71d3-2b1b-4b0b-9169-c34838a55494"
                        },
                        {
                          data: {
                            sapNumber: null,
                            name: "Spółka A",
                            address: null,
                            country: null,
                            vatId: "43432432432"
                          },
                          version: 1,
                          id: "a33fdf13-02dc-4046-ba46-9164bab5bf09"
                        }
                      ]
                    },
                    dataType: "object",
                    valueProperty: "data.name",
                    template: "<span>{{ item.data.name }}</span>",
                    validate: {
                      required: true
                    },
                    key: "dostawca",
                    type: "select",
                    input: true
                  }
                ],
                width: 6,
                offset: 0,
                push: 0,
                pull: 0,
                size: "md",
                currentWidth: 6
              },
              {
                components: [
                  {
                    label: "Miejsce przyjęcia",
                    widget: "choicesjs",
                    tableView: true,
                    data: {
                      values: [
                        {
                          label: "Kraków",
                          value: "krakow"
                        },
                        {
                          label: "Warszawa",
                          value: "warszawa"
                        },
                        {
                          label: "Warszawa2",
                          value: "warszawa2"
                        }
                      ]
                    },
                    validate: {
                      required: true
                    },
                    key: "miejscePrzyjecia",
                    type: "select",
                    input: true
                  },
                  {
                    label: "Data zakupu",
                    placeholder: "rrrr-mm-dd",
                    tableView: false,
                    datePicker: {
                      disableWeekends: false,
                      disableWeekdays: false
                    },
                    validate: {
                      required: true
                    },
                    enableMinDateInput: false,
                    enableMaxDateInput: false,
                    key: "dataDostarczenia1",
                    type: "datetime",
                    input: true,
                    widget: {
                      type: "calendar",
                      displayInTimezone: "viewer",
                      locale: "en",
                      useLocaleSettings: false,
                      allowInput: true,
                      mode: "single",
                      enableTime: true,
                      noCalendar: false,
                      format: "yyyy-MM-dd hh:mm a",
                      hourIncrement: 1,
                      minuteIncrement: 1,
                      time_24hr: false,
                      minDate: null,
                      disableWeekends: false,
                      disableWeekdays: false,
                      maxDate: null
                    }
                  },
                  {
                    label: "Data płatności",
                    placeholder: "rrrr-mm-dd",
                    tableView: false,
                    datePicker: {
                      disableWeekends: false,
                      disableWeekdays: false
                    },
                    validate: {
                      required: true
                    },
                    enableMinDateInput: false,
                    enableMaxDateInput: false,
                    key: "dataDostarczenia2",
                    type: "datetime",
                    input: true,
                    widget: {
                      type: "calendar",
                      displayInTimezone: "viewer",
                      locale: "en",
                      useLocaleSettings: false,
                      allowInput: true,
                      mode: "single",
                      enableTime: true,
                      noCalendar: false,
                      format: "yyyy-MM-dd hh:mm a",
                      hourIncrement: 1,
                      minuteIncrement: 1,
                      time_24hr: false,
                      minDate: null,
                      disableWeekends: false,
                      disableWeekdays: false,
                      maxDate: null
                    }
                  },
                  {
                    label: "NIP dostawcy",
                    disabled: true,
                    tableView: true,
                    redrawOn: "data",
                    customDefaultValue:
                      "// (function(){\n//   if(!value){\n//     console.log('Pobieramy dane');\n//     fetch('https://rickandmortyapi.com/api/character/?name=rick&status=alive')\n//       .then(response => response.json())\n//       .then(data => {\n//         if(data && data.results && data.results.length){\n//           let name = data.results[0].name;\n//             value = name;\n//             component.valueProperty = name;\n//             instance.valueProperty = name;\n//             console.log(value, name);\n//         }\n//       });\n//   }\n// })();\nif(!value && !data.dostawca){\n  value = 'Brak danych';\n}",
                    calculateValue:
                      "value = data.dostawca ? data.dostawca : 'Brak danych';\n",
                    allowCalculateOverride: true,
                    key: "nipDostawcy",
                    type: "textfield",
                    input: true
                  }
                ],
                width: 6,
                offset: 0,
                push: 0,
                pull: 0,
                size: "md",
                currentWidth: 6
              }
            ],
            key: "columns2",
            type: "columns",
            input: false,
            tableView: false
          },
          {
            label: "Faktura",
            optionsLabelPosition: "right",
            inline: false,
            tableView: false,
            values: [
              {
                label: "Papierowa",
                value: "papierowa",
                shortcut: ""
              },
              {
                label: "Elektroniczna",
                value: "elektroniczna",
                shortcut: ""
              }
            ],
            validate: {
              required: true
            },
            key: "faktura",
            type: "radio",
            input: true
          },
          {
            label: "Columns",
            columns: [
              {
                components: [
                  {
                    label: "Status",
                    widget: "choicesjs",
                    placeholder: "Wybierz",
                    tableView: true,
                    data: {
                      values: [
                        {
                          label: "Do zapłaty",
                          value: "doZaplaty"
                        },
                        {
                          label: "Zapłacono",
                          value: "zaplacono"
                        }
                      ]
                    },
                    validate: {
                      required: true
                    },
                    key: "status",
                    type: "select",
                    input: true
                  },
                  {
                    label: "Wartość brutto",
                    placeholder: "0,00",
                    mask: false,
                    spellcheck: true,
                    tableView: false,
                    currency: "PLN",
                    inputFormat: "plain",
                    truncateMultipleSpaces: false,
                    validate: {
                      required: true
                    },
                    key: "wartoscBrutto",
                    type: "currency",
                    input: true,
                    delimiter: true
                  },
                  {
                    label: "Grupa",
                    widget: "choicesjs",
                    placeholder: "Wybierz",
                    tableView: true,
                    data: {
                      values: [
                        {
                          label: "B2B",
                          value: "b2B"
                        },
                        {
                          label: "Dokument księgowy",
                          value: "dokumentKsiegowy"
                        },
                        {
                          label: "NCBIR",
                          value: "ncbir"
                        },
                        {
                          label: "Platforma/inny dokument płatniczy",
                          value: "platformaInnyDokumentPlatniczy"
                        },
                        {
                          label: "Rozliczenie delegacji",
                          value: "rozliczenieDelegacji"
                        }
                      ]
                    },
                    validate: {
                      required: true
                    },
                    key: "grupa",
                    type: "select",
                    input: true
                  }
                ],
                width: 6,
                offset: 0,
                push: 0,
                pull: 0,
                size: "md",
                currentWidth: 6
              },
              {
                components: [
                  {
                    label: "Typ płatności",
                    widget: "choicesjs",
                    tableView: true,
                    data: {
                      values: [
                        {
                          label: "Brak informacji",
                          value: ""
                        },
                        {
                          label: "Niewymagane",
                          value: "niewymagane"
                        },
                        {
                          label: "Niezapłacone",
                          value: "niezaplacone"
                        },
                        {
                          label: "Zapłacono kartą",
                          value: "zaplaconoKarta"
                        },
                        {
                          label: "Zapłacono przelewem",
                          value: "zaplaconoPrzelewem"
                        }
                      ]
                    },
                    key: "typPlatnosci",
                    type: "select",
                    input: true
                  },
                  {
                    label: "Waluta",
                    widget: "choicesjs",
                    tableView: true,
                    data: {
                      values: [
                        {
                          label: "CHF",
                          value: "chf"
                        },
                        {
                          label: "EUR",
                          value: "eur"
                        },
                        {
                          label: "PLN",
                          value: "pln"
                        },
                        {
                          label: "USD",
                          value: "usd"
                        }
                      ]
                    },
                    validate: {
                      required: true
                    },
                    key: "waluta",
                    type: "select",
                    input: true
                  },
                  {
                    label: "Typ",
                    widget: "choicesjs",
                    tableView: true,
                    data: {
                      values: [
                        {
                          label: "Brak",
                          value: "brak"
                        },
                        {
                          label: "Faktrura",
                          value: "faktrura"
                        },
                        {
                          label: "Faktura korygująca",
                          value: "fakturaKorygujaca"
                        },
                        {
                          label: "Nota obciążeniowa",
                          value: "notaObciazeniowa"
                        },
                        {
                          label: "Nota odsetkowa",
                          value: "notaOdsetkowa"
                        },
                        {
                          label: "Nota uznaniowa",
                          value: "notaUznaniowa"
                        },
                        {
                          label: "Paragon z NIP Onwelo",
                          value: "paragonZNipOnwelo"
                        },
                        {
                          label: "Pozostały: paragon/kwit",
                          value: "pozostalyParagonKwit"
                        },
                        {
                          label: "Rachunek",
                          value: "rachunek"
                        }
                      ]
                    },
                    refreshOn: "grupa",
                    validate: {
                      required: true
                    },
                    key: "typ",
                    type: "select",
                    input: true
                  }
                ],
                width: 6,
                offset: 0,
                push: 0,
                pull: 0,
                size: "md",
                currentWidth: 6
              }
            ],
            key: "columns3",
            type: "columns",
            input: false,
            tableView: false
          },
          {
            label: "Rodzaj",
            tableView: true,
            multiple: true,
            data: {
              values: [
                {
                  label: "Brak",
                  value: "brak"
                },
                {
                  label: "Duplikat",
                  value: "duplikat"
                },
                {
                  label: "Metoda kasowa",
                  value: "metodaKasowa"
                },
                {
                  label: "Metoda podzielonej płatności",
                  value: "metodaPodzielonejPlatnosci"
                }
              ]
            },
            validate: {
              required: true
            },
            key: "rodzaj",
            type: "select",
            input: true
          }
        ],
        collapsed: false
      },
      {
        title: "Opis dokumentu",
        collapsible: true,
        key: "opisDokumentu",
        type: "panel",
        label: "Panel",
        input: false,
        tableView: false,
        components: [
          {
            label: "Opis",
            placeholder: "Max. 4000 znaków",
            autoExpand: false,
            tableView: true,
            validate: {
              maxLength: 4000
            },
            key: "opis",
            type: "textarea",
            input: true
          },
          {
            label: "Request Id",
            tableView: true,
            key: "requestId",
            type: "textfield",
            input: true
          },
          {
            label: "Columns",
            columns: [
              {
                components: [
                  {
                    label: "Projekt",
                    widget: "choicesjs",
                    placeholder: "Wybierz",
                    tableView: true,
                    data: {
                      values: [
                        {
                          label: "A",
                          value: "a"
                        },
                        {
                          label: "B",
                          value: "b"
                        },
                        {
                          label: "C",
                          value: "c"
                        }
                      ]
                    },
                    refreshOn: "data",
                    calculateValue:
                      "if(window.backup === undefined){\n  window.backup = component.data.values;\n}\n\nfunction filterWhenNoCompany(isCompany, dataSource) {\n  if(!isCompany || !isCompany.length) {\n    return []\n  } \n  return [...dataSource];\n} \n\ncomponent.data.values = filterWhenNoCompany(data.spolka, window.backup);\n\n\n",
                    key: "projekt",
                    type: "select",
                    input: true
                  },
                  {
                    label: "Lokalizacja",
                    widget: "choicesjs",
                    placeholder: "Wybierz",
                    tableView: true,
                    data: {
                      values: [
                        {
                          label: "A",
                          value: "a"
                        },
                        {
                          label: "B",
                          value: "b"
                        },
                        {
                          label: "C",
                          value: "c"
                        }
                      ]
                    },
                    key: "lokalizacja",
                    type: "select",
                    input: true
                  }
                ],
                width: 6,
                offset: 0,
                push: 0,
                pull: 0,
                size: "md",
                currentWidth: 6
              },
              {
                components: [
                  {
                    label: "Centrum kosztowe",
                    widget: "choicesjs",
                    placeholder: "Wybierz",
                    tableView: true,
                    data: {
                      values: [
                        {
                          label: "A",
                          value: "a"
                        },
                        {
                          label: "B",
                          value: "b"
                        },
                        {
                          label: "C",
                          value: "c"
                        }
                      ]
                    },
                    key: "centrumKosztowe",
                    type: "select",
                    input: true
                  },
                  {
                    label: "Rick And Morty Select",
                    widget: "choicesjs",
                    tableView: true,
                    dataSrc: "url",
                    data: {
                      url:
                        "https://rickandmortyapi.com/api/character/?name=rick&status=alive",
                      headers: [
                        {
                          key: "",
                          value: ""
                        }
                      ]
                    },
                    valueProperty: "name",
                    template: "<span>{{ item.name }}</span>",
                    key: "rickAndMortySelect",
                    type: "select",
                    selectValues: "results",
                    disableLimit: false,
                    input: true
                  }
                ],
                width: 6,
                offset: 0,
                push: 0,
                pull: 0,
                size: "md",
                currentWidth: 6
              }
            ],
            key: "columns",
            type: "columns",
            input: false,
            tableView: false
          },
          {
            label: "Columns",
            columns: [
              {
                components: [
                  {
                    label: "Numer delegacji",
                    tableView: true,
                    key: "numerDelegacji",
                    type: "textfield",
                    input: true
                  }
                ],
                width: 6,
                offset: 0,
                push: 0,
                pull: 0,
                size: "md",
                currentWidth: 6
              },
              {
                components: [
                  {
                    label: "Numer rejestracyjny",
                    tableView: true,
                    key: "numerRejestracyjny",
                    type: "textfield",
                    input: true
                  }
                ],
                width: 6,
                offset: 0,
                push: 0,
                pull: 0,
                size: "md",
                currentWidth: 6
              }
            ],
            key: "columns4",
            type: "columns",
            input: false,
            tableView: false
          }
        ],
        collapsed: false
      },
      {
        label: "Wyślij",
        showValidations: false,
        disableOnInvalid: true,
        tableView: false,
        key: "submit",
        type: "button",
        input: true,
        saveOnEnter: false
      },
      {
        label: "Extra fields",
        defaultValue: "comments, document, attachments",
        key: "extraFields",
        type: "hidden",
        input: true,
        tableView: false
      }
    ],
    revisions: "",
    _vid: 0,
    title: "Kontrola formalno-rachunkowa",
    display: "form",
    access: [
      {
        roles: [],
        type: "create_own"
      },
      {
        roles: [],
        type: "create_all"
      },
      {
        roles: [],
        type: "read_own"
      },
      {
        roles: [
          "62222d4ab1854d443c0f590f",
          "62222d4ab1854df5260f591a",
          "62222d4ab1854d06140f5926"
        ],
        type: "read_all"
      },
      {
        roles: [],
        type: "update_own"
      },
      {
        roles: [],
        type: "update_all"
      },
      {
        roles: [],
        type: "delete_own"
      },
      {
        roles: [],
        type: "delete_all"
      },
      {
        roles: [],
        type: "team_read"
      },
      {
        roles: [],
        type: "team_write"
      },
      {
        roles: [],
        type: "team_admin"
      }
    ],
    submissionAccess: [
      {
        roles: ["000000000000000000000000"],
        type: "create_own"
      },
      {
        roles: ["000000000000000000000000"],
        type: "create_all"
      },
      {
        roles: [],
        type: "read_own"
      },
      {
        roles: [],
        type: "read_all"
      },
      {
        roles: [],
        type: "update_own"
      },
      {
        roles: [],
        type: "update_all"
      },
      {
        roles: [],
        type: "delete_own"
      },
      {
        roles: [],
        type: "delete_all"
      },
      {
        roles: [],
        type: "team_read"
      },
      {
        roles: [],
        type: "team_write"
      },
      {
        roles: [],
        type: "team_admin"
      }
    ],
    controller: "",
    properties: {},
    settings: {},
    name: "kontrolaFormalnoRachunkowa",
    path: "kontrolaformalnorachunkowa",
    project: "62222d4ab1854d6ee10f5903",
    created: "2022-03-04T16:12:49.086Z",
    modified: "2022-03-08T13:22:16.015Z",
    machineName: "kontrolaFormalnoRachunkowa"
  };
}
