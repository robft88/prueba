export interface Photo {
    $key?: string;
    id: number;
    title: string;
    isLiked?: boolean;
    toShow: boolean;
    format: string;
    urlPhoto: string;
    urlPhotoMini: string;
}
