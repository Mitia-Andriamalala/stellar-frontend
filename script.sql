-- Désactiver les contraintes de clés étrangères

    DELETE FROM llx_commandedet;
    DELETE FROM llx_facturedet;
    DELETE FROM llx_stock_mouvement; 

-- Supprimer toutes les données de llx_product
DELETE FROM llx_product;

-------------------------------------


-- Supprime les données d'achat (prix fournisseurs)
DELETE FROM llx_product_fournisseur_price;

-- Supprime les associations produits-catégories
DELETE FROM llx_categorie_product;

-- Supprime les produits
DELETE FROM llx_product;

