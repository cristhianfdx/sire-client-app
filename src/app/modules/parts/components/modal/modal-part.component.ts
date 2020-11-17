import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireStorageReference } from '@angular/fire/storage';
import { PartService } from '@core/services/part.service';
import { Observable } from 'rxjs';

import {
  faTimesCircle,
  faChevronDown,
  faFileUpload,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';

import { NotificationUtilService } from '@core/services/utils/notification-util.service';
import { FirebaseStorageService } from '@core/services/firebase-storage.service';
import { BrandValidator } from '@core/validators/option-select.validator';
import { Brand } from '@core/models/brand';
import { Part } from '@core/models/part';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-modal-part',
  templateUrl: './modal-part.component.html',
  styleUrls: ['./modal-part.component.scss'],
})
export class ModalPartComponent implements OnInit, OnDestroy {
  part: Part;
  brand$: Observable<Brand[]>;

  faChevronDown = faChevronDown;
  faTimesCircle = faTimesCircle;
  faFileUpload = faFileUpload;
  faPlus = faPlus;

  fileRef: AngularFireStorageReference;
  partForm: FormGroup;
  file: File;

  uploadFinish = false;
  uploadPercentage = 0;
  publicImageURL: any;
  localImageURL: any;
  filename: string;
  action: string;

  constructor(
    private notificationUtilService: NotificationUtilService,
    private firebaseStorage: FirebaseStorageService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private partService: PartService,
    private router: Router
  ) {
    const params: any = this.activatedRoute.snapshot.params;
    if (Object.keys(params).length > 0) {
      this.part = JSON.parse(atob(params.part));
    }
  }

  ngOnDestroy(): void {
    this.part = null;
  }

  ngOnInit(): void {
    this.action = !this.part ? 'Crear' : 'Editar';
    if (this.part) {
      this.buildEditForm();
    } else {
      this.buildForm();
    }

    this.getBrands();
  }

  getBrands(): void {
    this.brand$ = this.partService.getBrands();
  }

  private buildForm(): void {
    this.partForm = this.formBuilder.group(
      {
        name: ['', [Validators.required]],
        imageUrl: [null, [Validators.required]],
        description: [''],
        brand: ['Seleccione Marca', [Validators.required]],
      },
      {
        validator: BrandValidator.IsValidBrand,
      }
    );
  }

  private buildEditForm(): void {
    const { name, description, brand } = this.part;

    this.partForm = this.formBuilder.group({
      name: [name],
      imageUrl: [null],
      description: [description],
      brand: [brand.id, [Validators.required]],
    });
  }

  fileChange(event: any): void {
    const fileReader = new FileReader();
    this.file = event.target.files[0];
    this.filename = this.file.name;
    fileReader.readAsDataURL(this.file);
    this.renderImage(fileReader);
  }

  renderImage(reader: FileReader): void {
    reader.onload = () => {
      this.localImageURL = reader.result;
    };
  }

  upload(): void {
    if (this.part) {
      this.update();
    } else {
      if (!this.partForm.invalid) {
        this.fileRef = this.firebaseStorage.fileReference(this.filename);
        const task = this.firebaseStorage.uploadBlob(this.fileRef, this.file);
        task.percentageChanges().subscribe((percentage) => {
          this.uploadPercentage = Math.round(percentage);
          if (this.uploadPercentage === 100) {
            this.fileRef.getDownloadURL().subscribe((URL: string) => {
              this.save(URL);
            });
          }
        });
      }
    }
  }

  save(imageURL: string): void {
    const request: Part = this.partForm.value;
    request.imageUrl = imageURL;
    this.partService.create(request).subscribe(
      () => {
        this.backToHomeSection();
        this.notificationUtilService.newOkMessage('Repuesto creado.');
      },
      ({ status }) => this.throwErrorMessages(status)
    );
  }

  update(): void {
    const request: Part = this.partForm.value;
    delete request.imageUrl;
    this.partService.update(this.part.id, request).subscribe(
      () => {
        this.backToHomeSection();
        this.notificationUtilService.newOkMessage('Repuesto actualizado.');
      },
      ({ status }) => this.throwErrorMessages()
    );
  }

  createBrand(description: string): void {
    const brand: Brand = { description };
    this.partService.createBrands(brand).subscribe(() => {
      this.getBrands();
    });
  }

  backToHomeSection(): void {
    this.router.navigate(['/parts']);
  }

  throwErrorMessages(status?: number): void {
    this.notificationUtilService.newErrorMessage(
      'Estamos presentando fallas, por favor intente más tarde'
    );
  }

  checkErrors(control: string): boolean {
    return (
      this.partForm.controls[control].invalid &&
      (this.partForm.controls[control].dirty ||
        this.partForm.controls[control].touched)
    );
  }
}
