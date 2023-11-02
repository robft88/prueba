export interface Photo {
    $key?: string;
    format: string;
    id: number;
    isLiked?: boolean;
    order: number;
    title: string;
    toShow: boolean;
    urlPhoto: string;
    urlPhotoMini: string;
}
