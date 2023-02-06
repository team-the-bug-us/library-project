// ℹ️ package responsible to make the connection with mongodb
// https://www.npmjs.com/package/mongoose
const mongoose = require("mongoose");
const Book = require("../models/Books.model")

const books = [
  {
    title: "Le deuxième sexe",
    authors: ["Simone de Beauvoir"],
    categories: ["Essai"],
    description:`Le Deuxième Sexe est un essai1 de Simone de Beauvoir, paru en 1949. Cet essai est divisé en deux tomes. Le Deuxième Sexe n'a pas été écrit dans un but militant. L'écrivaine a voulu produire une somme à la façon des encyclopédies : tout connaître, tout dire dans les moindres détails. Mais l'essai s'inscrit aussi dans un plus large projet autobiographique2.

    L'ouvrage s'inscrit dans un double cadre philosophique, celui de l'existentialisme et celui de la phénoménologie3,4. Ainsi, son essai n’est pas un simple constat sur la situation des femmes après la Seconde Guerre mondiale ; c’est une œuvre à teneur philosophique, riche de références littéraires, historiques, sociologiques, biologiques et médicales. Le credo qui paraît en filigrane tout au long des pages est bien qu'aucune femme n'a de destin tout tracé. Simone de Beauvoir, excluant tout déterminisme chez l’humain, s'intéresse donc autant à l'infériorisation de la femme en tant que fait, qu'à ses causes, qui ne sauraient venir de quelque ordre naturel. L'existentialisme implique aussi l'entière responsabilité humaine : ainsi, Beauvoir incrimine presque autant les femmes, dont elle dénonce la passivité, la soumission et le manque d’ambition, que les hommes, qu'elle accuse de sexisme, de lâcheté et parfois de cruauté. Elle estime en conséquence que le féminisme réussira grâce à la volonté solidaire des hommes et des femmes. Selon elle, les deux grands faits qui permettraient à la femme de s'émanciper sont le contrôle des naissances et l'accès au monde du travail.
    
    À sa sortie, l'ouvrage est violemment critiqué mais est néanmoins immédiatement un succès. Le Deuxième Sexe s’est vendu à plusieurs millions d'exemplaires dans le monde, traduit dans de nombreuses langues. Il reste à ce jour une référence majeure de la philosophie féministe.`, 
    image :"https://upload.wikimedia.org/wikipedia/commons/9/99/Le_deuxi%C3%A8me_sexe.jpg",
    averageRating : 5,
    retailPrice : 20,
  }, 
  {
    title: "L'idot",
    authors: ["Fiodor Dostoïvsky"],
    categories: ["Roman"],
    description:`L'ouvrage s'inscrit dans un double cadre philosophique, celui de l'existentialisme et celui de la phénoménologie3,4. Ainsi, son essai n’est pas un simple constat sur la situation des femmes après la Seconde Guerre mondiale ; c’est une œuvre à teneur philosophique, riche de références littéraires, historiques, sociologiques, biologiques et médicales. Le credo qui paraît en filigrane tout au long des pages est bien qu'aucune femme n'a de destin tout tracé. Simone de Beauvoir, excluant tout déterminisme chez l’humain, s'intéresse donc autant à l'infériorisation de la femme en tant que fait, qu'à ses causes, qui ne sauraient venir de quelque ordre naturel. L'existentialisme implique aussi l'entière responsabilité humaine : ainsi, Beauvoir incrimine presque autant les femmes, dont elle dénonce la passivité, la soumission et le manque d’ambition, que les hommes, qu'elle accuse de sexisme, de lâcheté et parfois de cruauté. Elle estime en conséquence que le féminisme réussira grâce à la volonté solidaire des hommes et des femmes. Selon elle, les deux grands faits qui permettraient à la femme de s'émanciper sont le contrôle des naissances et l'accès au monde du travail.`, 
    image :"https://static.fnac-static.com/multimedia/Images/FR/NR/ae/49/00/18862/1507-1/tsp20201106070919/L-Idiot.jpg",
    averageRating : 5,
    retailPrice : 5,
  },
  {
    title: "His dark materials",
    authors: ["Philippe Pullman"],
    genre: "Roman",
    description:`His Dark Materials is a trilogy of fantasy novels by Philip Pullman consisting of Northern Lights (1995; published as The Golden Compass in North America), The Subtle Knife (1997), and The Amber Spyglass (2000). It follows the coming of age of two children, Lyra Belacqua and Will Parry, as they wander through a series of parallel universes. The novels have won a number of awards, including the Carnegie Medal in 1995 for Northern Lights and the 2001 Whitbread Book of the Year for The Amber Spyglass. In 2003, the trilogy was ranked third on the BBC's The Big Read poll.[1]

    Although His Dark Materials has been marketed as young adult fiction, and the central characters are children, Pullman wrote with no target audience in mind. The fantasy elements include witches and armoured polar bears; the trilogy also alludes to concepts from physics, philosophy, and theology. It functions in part as a retelling and inversion of John Milton's epic Paradise Lost,[2] with Pullman commending humanity for what Milton saw as its most tragic failing, original sin.[3] The trilogy has attracted controversy for its criticism of religion.
    
    The London Royal National Theatre staged a two-part adaptation of the trilogy in 2003–2004. New Line Cinema released a film adaptation of Northern Lights, The Golden Compass, in 2007. A HBO/BBC television series based on the novels commenced broadcast in November 2019.[4][5]
    
    Pullman followed the trilogy with three novellas set in the Northern Lights universe: Lyra's Oxford (2003), Once Upon a Time in the North (2008), and Serpentine (2020). La Belle Sauvage, the first book in a new trilogy titled The Book of Dust, was published on 19 October 2017; the second book of the new trilogy, The Secret Commonwealth, was published in October 2019. Both are set in the same universe as Northern Lights.`, 
    image :"https://m.media-amazon.com/images/I/710Hna4IrUL.jpg",
    rating : 5,
    price : 30,
  }
]


// ℹ️ Sets the MongoDB URI for our app to have access to it.
// If no env has been set, we dynamically set it to whatever the folder name was upon the creation of the app

const MONGO_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/library-project";

mongoose
  .connect(MONGO_URI)
  .then((x) => {
    const databaseName = x.connections[0].name;
    console.log(`Connected to Mongo! Database name: "${databaseName}"`);
    //return Book.create(books); 
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });
