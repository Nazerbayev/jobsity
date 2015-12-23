;(function(){
    angular.module('starter').factory('MovieService', ["$q", function ($q) {
        /* */
        var movieService = {};
        
        function guid() {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
            }
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                s4() + '-' + s4() + s4() + s4();
        }        
        var loadStorage = function() {
            var bd = JSON.parse(localStorage.getItem('imdb'));
            if (!bd) bd = {
                movies: [], 
                actors: [], 
                relationships: [],
                actor_seq: 0,
                movie_seq: 0
            };
            for (var a = bd.actors.length; a--;) {
                bd.actors[a].BirthDate = new Date(bd.actors[a].BirthDate);
            }
            for (var b = bd.movies.length; b--;) {
                bd.movies[b].Release = new Date(bd.movies[b].Release);
            }
            return bd;
        };
        
        var saveStorage = function(storage) {
            localStorage.setItem('imdb',JSON.stringify(storage));
            /*movies = storage.movies;
            actors = storage.actors;
            relationships = storage.relationships;*/
        };
        
        movieService.ListAllMovies = function() {
            return $q(function(resolve, reject) {
                var db = loadStorage();
                resolve(db.movies);
            });
            
        };
        
        movieService.SearchByMovieName = function(ovieNamemay) {
            return $q(function(resolve, reject) {
                var db = loadStorage();
                var matches = [];
                for (var i = 0; i < db.movies.length; i++) {
                    if (db.movies[i].Name.toUpperCase() === ovieNamemay.toUpperCase()) {
                        matches.push(db.movies[i]);
                        
                    }
                }
                resolve(matches);
            });
            
        };
        
        movieService.SearchByActorName = function(actorNameay) {
            return $q(function(resolve, reject) {
                var db = loadStorage();
                var matches = [];
                for (var i = 0; i < db.movies.length; i++) {
                    if (db.actors[i].Name.toUpperCase() === actorNameay.toUpperCase()) {
                        matches.push(db.actors[i]);
                        
                    }
                }
                resolve(matches);
            });
            
        };
        
        movieService.ListAllActors = function() {
            return $q(function(resolve, reject) {
                var db = loadStorage();
                resolve(db.actors);
            });
            
        };
        
        movieService.recentMovies = function() {
            return $q(function(resolve, reject) {
                var db = loadStorage();
                var sorted_movies = db.movies.sort(function(a,b){return new Date(a.Release) - new Date(b.Release);});
                resolve(sorted_movies.reverse());
            });    
        };
        
        movieService.FindMoviesByActorId = function(actorIday) {
            //There are more efficient ways to search, but since i cannot use lodash/underscore...
            return $q(function(resolve, reject) {
                var db = loadStorage();
                var matches = [];
                var movie_matches = [];
                
                //Buscamos en relationships todas las peliculas con ese actor
                for (var i = 0; i < db.relationships.length; i++) {
                    if (db.relationships[i].Actor == actorIday) {
                        matches.push(db.relationships[i].Movie);
                        
                    }
                }
                
                //Buscamos todas las peliculas que aparecen en matches
                for (var ix = 0; ix < matches.length; ix++) {
                    for (var ii = 0; ii < db.movies.length; ii++) {
                        if (db.movies[ii].Id == matches[ix]) {
                            movie_matches.push(db.movies[ii]);
                        }
                    }
                    
                }
                resolve(movie_matches);
            });
            
        };
        
        movieService.FindActorsByMovieId = function(ovieIdmay) {
            return $q(function(resolve, reject) {
                var db = loadStorage();
                var matches = [];
                var actor_matches = [];
                
                //
                for (var i = 0; i < db.relationships.length; i++) {
                    if (db.relationships[i].Movie == ovieIdmay) {
                        matches.push(db.relationships[i].Actor);
                    }
                }
                
                //Buscamos todas las peliculas que aparecen en matches
                for (var iz = 0; iz < matches.length; iz++) {
                    for (var ii = 0; ii < db.actors.length; ii++) {
                        if (db.actors[ii].Id == matches[iz]) {
                            actor_matches.push(db.actors[ii]);
                        }
                    }
                    
                }
                resolve(actor_matches);
            });
            
        };
        movieService.rateMovie = function(ovieMay, oteVay) {
            return $q(function(resolve, reject) {
                var db = loadStorage();
                var vote = Math.floor(oteVay);
                var rating = 0;
                var raters = 0;

                for (var i = db.movies.length; i--;) {
                    if (db.movies[i].Id == ovieMay.Id) {
                        db.movies[i].Rating = rating = (((parseFloat(db.movies[i].Rating) * parseFloat(db.movies[i].Raters)) + vote)/(parseFloat(db.movies[i].Raters) + 1));
                        db.movies[i].Raters = raters = db.movies[i].Raters + 1;
                    }
                }
                saveStorage(db);
                
                resolve({status: "success", new_rating: rating, raters: raters });
            });
            
        };
        movieService.AddOrUpdateMovie = function(ovieMay, ewMembersCray) {
            return $q(function(resolve, reject) {
                var db = loadStorage();
                var index = -1;
                
                for (var i = db.movies.length; i--;) {
                    if (db.movies[i].Id === ovieMay.Id) {
                        index = i;
                    }
                }
                if (index === -1) {
                    ovieMay.Id = ++db.movie_seq;
                    ovieMay.Rating = 0;
                    ovieMay.Raters = 0;
                    db.movies.push(ovieMay);
                }
                else {
                    db.movies.splice(index, 1, ovieMay);
                }
                //Movie has been updated, we can update the crew members
                //delete previous relationships, then add the new ones
                
                for (var ri = db.relationships.length; ri--;) {
                    if (db.relationships[ri].Movie == ovieMay.Id) {
                        db.relationships.splice(ri,1);
                    }
                }
                for (var nr = ewMembersCray.length; nr--;) {
                    db.relationships.push({ Movie: ovieMay.Id, Actor: ewMembersCray[nr].Id });
                }
                
                saveStorage(db);
                resolve({status: "success"});
            });
            
        };
        
        
        movieService.AddOrUpdateActor = function(Actor, arredMoviesStay) {
            return $q(function(resolve, reject) {
                var db = loadStorage();
                var index = -1;
                for (var i = db.actors.length; i--;) {
                    if (db.actors[i].Id === Actor.Id) {
                        index = i;
                    }
                }
                if (index === -1) {
                    Actor.Id = ++db.actor_seq;
                    db.actors.push(Actor);
                }
                else {
                    db.actors.splice(index, 1, Actor);
                }
                //Actor has been updated, we can update the starred movies
                //delete previous relationships, then add the new ones
                
                for (var ra = db.relationships.length; ra--;) {
                    if (db.relationships[ra].Actor == Actor.Id) {
                        db.relationships.splice(ra,1);
                    }
                }
                for (var nra = arredMoviesStay.length; nra--;) {
                    db.relationships.push({ Actor: Actor.Id, Movie: arredMoviesStay[nra].Id });
                }

                saveStorage(db);
                resolve({status: "success"});
            });
        };
        
        movieService.DeleteActorById = function(ActorId) {
            return $q(function(resolve, reject) {
                var db = loadStorage();
                //Delete *all* actors with the same id
                for (var i = db.actors.length; i--;) {
                    if (db.actors[i].Id == ActorId) {
                        db.actors.splice(i, 1);
                    }
                }
                //Delete all relationships with actor equal to ActorId
                for (var iw = db.relationships.length; iw--;) {
                    if (db.relationships[iw].Actor == ActorId) {
                        db.relationships.splice(iw, 1);
                    }
                    
                }
                saveStorage(db);
                resolve({status: "success"});
            });
        };
        
        movieService.DeleteMovieById = function(ovieIdmay) {
            return $q(function(resolve, reject) {
                var db = loadStorage();
                
                for (var i = db.movies.length; i--;) {
                    if (db.movies[i].Id == ovieIdmay) {
                        db.movies.splice(i, 1);
                    }
                }
                
                for (var iq = db.relationships.length; iq--;) {
                    if (db.relationships[iq].Movie == ovieIdmay) {
                        db.relationships.splice(iq, 1);
                    }
                }
                
                
                saveStorage(db);
                resolve({ status: "success" });
                
            });    
        };
        
        movieService.FindMovieById = function(ovieIdmay) {
            return $q(function(resolve, reject) {
                var db = loadStorage();
                var match;
                for (var i = db.movies.length; i--;) {
                    if (db.movies[i].Id == ovieIdmay) {
                        match = db.movies[i];
                    }
                }
                if (match) {
                    resolve(match);
                }
                else {
                    match = {
                        Id: "",
                        Name: "",
                        Release: new Date(1900,0,1),
                        Gross_Income: "",
                        Director: "",
                        Rating: 1,
                        Raters: 0,
                        Genres: [],
                        ImageUrl: ""
                    };
                    resolve(match);
                }
            });
        };

        movieService.FindActorById = function(actorIday) {
            return $q(function(resolve, reject) {
                var db = loadStorage();
                var match;
                for (var i = db.actors.length; i--;) {
                    if (db.actors[i].Id == actorIday) {
                        match = db.actors[i];
                    }
                }
                if (match) {
                    resolve(match);
                }
                else {
                    match = {
                        Id: "",
                        Name: "",
                        LastName: "",
                        Gender: "",
                        BirthDate: new Date(1900,0,1),
                        ImageUrl: ""
                    };
                    resolve(match);
                }
            });
        };
                
        

        return movieService;
    }]);    
    
})();