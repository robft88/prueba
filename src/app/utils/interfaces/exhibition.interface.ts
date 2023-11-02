export interface Exhibition {
  code: string;
  end: number;
  id: number;
  location: Location;
  mailToFooter: string;
  name: string;
  start: number;
  version: string;
}

interface Location {
  address: string;
  name: string;
}
