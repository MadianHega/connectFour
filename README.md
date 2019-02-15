


Le Puissance 4 que j'ai créé est une application Reactjs tour par tour en local. Elle est bootstrapper avec [Create React App](https://github.com/facebook/create-react-app) et utilise [React-Redux](https://github.com/reduxjs/react-redux)


**Pourquoi le composant Board ?**

Board est le plateau du jeu, de ce composant en découle toute la mécanique.
Il permet d'en faire l'élément central de l'application, y placer toutes les mécaniques du jeu et faire appel aux autres composants cruciaux d'un puissance 4 (lignes et jetons).

**Pourquoi le composant Row ?**

Le composant Row simule les lignes du jeu.

Pourquoi une class et non une fonction ?
Car les Rows ont besoin de transmettre et stocker des informations dans le temps, ce qu'une fonction ne fait pas.

**Pourquoi le composant Token ?**

Le composant Token simule les trous vides du plateau ainsi que les jetons.

**Pourquoi le composant Header ?**

Le Header sert de tableau de bord pour les joueurs, il indique : à qui est le tour de jouer, le potentiel gagnant, le tableau des victoires en fin de partie. Il informe également des éventuelles erreurs de requêtes.

**Pourquoi utiliser le fetch ?**

Si un joueur remporte une partie, une requête `POST` est envoyée pour enregistrer la victoire du joueur en base de donnée et un tableau nous est renvoyé contenant le tableau des victoires.
La méthode `POST` est utilisée lors du fetch car le tableau évolue à chaque victoire. Cela évite d'éventuelles erreurs dûes à la mise en cache de la méthode `GET`.


**Pourquoi faire passer des Props du composant Board à ses enfants Row et Token sans passer par Redux?**

Passer par Redux pour la transmission de ces informations est moins avantageux pour 3 raisons :

1.Board a besoin de faire appel au composant Row pour se dessiner, et ce-dernier fait de même avec Token. Profiter de ces appels pour transmettre les props est simple et rapide. Créer un reduceur pour chacune de ces actions est à mes yeux peu bénéfique.

2.Board a besoin de connaître le rowIndex de ses enfants Row et le ColIndex de ses petits enfants  Token. La transmission de ces informations de parents à enfants puis d'enfants à parents via Redux est beaucoup plus long à mettre en place et moins stable.

3.Token a besoin  d'actionner la fonction game() de son parent Board à chaque fois qu'il est cliqué. Il est beaucoup plus rapide de donner l'accès à cette fonction directement via les props.
Pour mettre en place cette action via redux il aurait fallu mettre en place une fonction componentDidUpdate(prevProps) au composant Board et lui administrer un reduceur partagé par Token et Board.

**l'Application à deux états redux**

Ces états sont sous redux car ils sont partagés par plusieurs composants qui ne sont pas tous parents. Passer par redux dans ce cas présent est beaucoup plus simple que de faire remonter puis redescendre des informations de composant en composant.

  - [currentPlayer]: Il indique à qui est le tour de jouer. Il s'initialise à 1 et switch entre 1 et 2 lorsque les joueurs jouent. La mécanique s'opère au sein du fichier reduceur. Cet état est partagé avec les composants Header,Board et Token.

  - [win]: est un object qui a deux propriétés :
winning : qui s'initialise à false et passe à true si un joueur aligne 4 jetons.
winner : qui s'initialise en chaîne de caractère vide. Si winning passe à true le nom du vainqueur est déversé dans winner. Cet état est partagé par les composants Header et Token, et Board actionne le reduceur.


**Fonctions présentes:**

##Board à 3 fonctions =

  - initBoard () = cette fonction prend en paramètre les props [row] et [col] et itère sur ces
  valeurs, ce qui donne un tableau contenant 6 tableaux qui eux-mêmes contiennent 7 colones dont la valeur est initisalisée à 0.

Tableau return par initBoard :

[0,0,0,0,0,0,0]
[0,0,0,0,0,0,0]
[0,0,0,0,0,0,0]
[0,0,0,0,0,0,0]
[0,0,0,0,0,0,0]
[0,0,0,0,0,0,0]

  - game () = cette fonction prend en paramètre l'index de la colone cliquée et itère sur la colone renseignée dans le paramètre jusqu'à trouver la valeur 0. Elle remplace ensuite la valeur 0 par celle de l'état [currentPlayer] avant de mettre à jour l'état [board] avec la nouvelle valeur, elle appelle la fonction searchWin() et enfin actionne le mécanisme du reduceur currentPlayer.


  - searchWin()  = cette fonction itère sur le plateau. Un compteur est initialisé à zéro.
  A chaque récurrence, le compteur prend 1. Si le compteur arrive à 4, c'est que 4 jetons sont alignés. La fonction envoie à l'état redux [win] la valeur qu'elle a retrouvé.


##Token a 1 fonction =

  - handleClick() = qui fait appel à la fonction game() transmise en props depuis le composant Board.
