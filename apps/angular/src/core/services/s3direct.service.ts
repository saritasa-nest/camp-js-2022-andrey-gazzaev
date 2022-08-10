import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, switchMap, tap } from 'rxjs';
import { AppConfigService } from './app-config.service';

interface S3UploadDto {
  'policy': string;
  'success_action_status': string;
  'x-amz-credential': string;
  'x-amz-date': string;
  'x-amz-signature': string;
  'x-amz-algorithm': string;
  'form_action': string;
  'key': string;
  'acl': string;
  'x-amz-security-token': string;
  'content-type': string;
  ' Cache-Control': string;
  'Content-Disposition': string;
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

    this.s3directUrl = new URL(`/s3direct/get_params/`, config.apiUrl);
  }

  public saveAnimePoster(poster: FormData, posterName: string) {

    return this.http.post<S3UploadDto>(this.s3directUrl.toString(), {
      dest: 'anime_images',
      filename: posterName,
    }).pipe(
      switchMap(S3UploadDto => this.http.post(S3UploadDto.form_action, poster)),
      tap(obj => console.log(obj)),
    );
  }
}
