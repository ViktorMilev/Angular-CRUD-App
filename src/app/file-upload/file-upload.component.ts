
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadWidgetModule } from "@bytescale/upload-widget-angular";
import { UploadWidgetConfig, UploadWidgetResult } from '@bytescale/upload-widget';

@Component({
    selector: 'app-file-upload',
    standalone: true,
    imports: [CommonModule, UploadWidgetModule],
    templateUrl: './file-upload.component.html',
    styleUrls: ['./file-upload.component.scss']
})

export class FileUploadComponent {
    @Output() newItemEvent = new EventEmitter<string>();

    myCustomLocale = {
        addAnotherFileBtn: "Добави друг файл...",
        addAnotherImageBtn: "Добави друга снимка...",
        cancelBtn: "откажи",
        cancelBtnClicked: "отменено",
        cancelPreviewBtn: "Откажи",
        continueBtn: "Продължи",
        cropBtn: "Изрежи",
        customValidationFailed: "Неуспешно валидиране на файла.",
        doneBtn: "Готово",
        fileSizeLimitPrefix: "Ограничение за размера на файла:",
        finishBtn: "Готово",
        finishBtnIcon: true,
        imageCropNumberPrefix: "Снимка",
        maxFilesReachedPrefix: "Максимален брой файлове:",
        maxImagesReachedPrefix: "Максимален брой снимки:",
        orDragDropFile: "...или плъзнете и пуснете снимката тук.",
        orDragDropFileMulti: "...или плъзнете и пуснете снимките тук.",
        orDragDropImage: "...или плъзнете и пуснете снимката тук.",
        orDragDropImageMulti: "...или плъзнете и пуснете снимките тук.",
        processingFile: "Файлът се обработва...",
        removeBtn: "премахни",
        removeBtnClicked: "премахнато",
        submitBtnError: "Грешка!",
        submitBtnLoading: "Моля изчакайте...",
        unsupportedFileType: "Файловият формат не се поддържа.",
        uploadFileBtn: "Качете снимка",
        uploadFileMultiBtn: "Качване на файлове",
        uploadImageBtn: "Качване на снимка",
        uploadImageMultiBtn: "Качване на снимки",
        xOfY: "of"
    };
    
    options: UploadWidgetConfig = {
        apiKey: "public_12a1yvEBy7wvf7idU9gNr4b4yfC8",
        maxFileCount: 1,
        locale: this.myCustomLocale,
        styles: {
            colors: {
                "active": "#5555B1",
                "error": "#d23f4d",
                "primary": "#45458F",
                "shade100": "#333",
                "shade200": "#7a7a7a",
                "shade300": "#999",
                "shade400": "#a5a6a8",
                "shade500": "#d3d3d3",
                "shade600": "#dddddd",
                "shade700": "#f0f0f0",
                "shade800": "#f8f8f8",
                "shade900": "#fff"
            }
        }
    };

    onComplete = (files: UploadWidgetResult[]) => {
        this.uploadedFileUrl = files[0]?.fileUrl;
        this.newItemEvent.emit(this.uploadedFileUrl);
    };

    uploadedFileUrl: string | undefined = undefined;
} 