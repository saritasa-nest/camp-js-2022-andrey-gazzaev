import { xml2js } from 'xml-js';
import { map, Observable, switchMap } from 'rxjs';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { S3UploadDto } from '@js-camp/core/dtos/s3upload.dto';

import { AppConfigService } from './app-config.service';

interface PostDataDto {

  /** Request URL. */
  readonly formAction: string;

  /** Form data. */
  readonly formData: FormData;
}

interface S3ResponseDto {

  /** S3 post response. */
  // Server response in camelCase format.
  // eslint-disable-next-line @typescript-eslint/naming-convention
  readonly PostResponse: {

    /** Image URL location object. */
    // eslint-disable-next-line @typescript-eslint/naming-convention
    readonly Location: {

      /** Image URL. */
      readonly _text: string;
    };
  };
}

/** S3Direct service. */
@Injectable({
  providedIn: 'root',
})
export class S3directService {

  private readonly s3directUrl: URL;

  public constructor(
    config: AppConfigService,
    private readonly http: HttpClient,
  ) {

    this.s3directUrl = new URL(`s3direct/get_params/`, config.apiCampBaseUrl);
  }

  /**
   * Uploads file to s3.
   * @param poster File.
   * @param posterName File name (poster.jpg).
   */
  public uploadAnimePoster(poster: File, posterName: string): Observable<string> {
    return this.http.post<S3UploadDto>(this.s3directUrl.toString(), {
      dest: 'anime_images',
      filename: posterName,
    }).pipe(
      map(s3UploadDto => this.createPostData(s3UploadDto, poster)),
      switchMap(({ formAction, formData }) => this.http.post(formAction, formData, { responseType: 'text' })),
      map(xml => xml2js(xml, { compact: true }) as S3ResponseDto),
      map(s3ResponseDto => s3ResponseDto.PostResponse.Location._text),
    );
  }

  private createPostData(s3UploadDto: S3UploadDto, file: File): PostDataDto {
    const s3Upload = new FormData();
    s3Upload.append('key', s3UploadDto.key);
    s3Upload.append('success_action_status', s3UploadDto.success_action_status);
    s3Upload.append('x-amz-security-token', s3UploadDto['x-amz-security-token']);
    s3Upload.append('x-amz-date', s3UploadDto['x-amz-date']);
    s3Upload.append('x-amz-signature', s3UploadDto['x-amz-signature']);
    s3Upload.append('x-amz-credential', s3UploadDto['x-amz-credential']);
    s3Upload.append('acl', s3UploadDto.acl);
    s3Upload.append('policy', s3UploadDto.policy);
    s3Upload.append('x-amz-algorithm', s3UploadDto['x-amz-algorithm']);
    s3Upload.append('file', file);

    return { formAction: s3UploadDto.form_action, formData: s3Upload };
  }
}
