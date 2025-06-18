import {Article} from './article_model';

export interface PanierItem {
  article: Article;
  quantite: number;
  sousTotal: number;
}
