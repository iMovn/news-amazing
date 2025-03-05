export interface MenuItem {
  id: number;
  name: string;
  link: string;
  is_active: number;
  children: MenuItem[];
}
