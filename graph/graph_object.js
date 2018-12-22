function Graph() {
    const matrix = {};

    return {
        /**
         * Add new vertex to graph
         * @param {number} vertexIndex
         */
        addVertex: function (vertexIndex) {
            if (matrix[vertexIndex] !== undefined) {
                throw new Error("This vertex already exist.");
            }

            matrix[vertexIndex] = {};
        },
        /**
         * Add new edge to graph
         * @param {number} from. Start edge vertex.
         * @param {number} to. End edge vertex.
         * @param {number} weight. Edge's weight
         */
        addEdge: function (from, to, weight) {
            if (matrix[from] === undefined || matrix[to] === undefined) {
                throw new Error("One of the vertexes doesn't exist.");
            }
            matrix[from][to] = weight;
        },
        /**
         * Add vertexes to graph
         * @param {Array} vertexIndexes. Array of vertexes. Example: [0,2,3]
         */
        addVertexes: function (vertexIndexes) {
            vertexIndexes.forEach((value) => {
                this.addVertex(value);
            });
        },
        /**
         * Delete vertex from graph. Here will be deleted all vertex edges too.
         * @param {number} vertexIndex
         */
        deleteVertex: function (vertexIndex) {
            if (matrix[vertexIndex] === undefined) {
                throw new Error("This vertex doesn't exist.");
            }

            delete matrix[vertexIndex];
            for (let index in matrix) {
                if (matrix[index][vertexIndex] !== undefined) {
                    delete matrix[index][vertexIndex];
                }
            }
        },
        /**
         * Delete vertexes from graph.
         * @param {Array} vertexIndexes. Example of array: [3,4,5]
         */
        deleteVertexes: function (vertexIndexes) {
            vertexIndexes.forEach((value) => {
                this.deleteVertex(value);
            });
        },
        /**
         * Add edges for particular vertex
         * @param from existed vertex(edge start)
         * @param {Object} edges. Example of object : {0:3, 1:2},
         * where 0 and 1 are vertexes(edge end); 3 and 2 are edges weight
         */
        addVertexEdges: function (from, edges) {
            for (let index in edges) {
                this.addEdge(from, index, edges[index]);
            }
        },
        /**
         * Add vertexes and their edges
         * @param {Object} vertexesAndTheirEdges. Example of object : {{2: {1:5}}, 3: {0:4,1:10}},
         * where 2 and 3 - existed or not existed vertexes(edge start), 0 and 1 - existed vertexes(edge end),
         * 5, 4, 10 - edges weight.
         */
        addVertexesAndTheirEdges(vertexesAndTheirEdges) {
            this.addVertexes(Object.keys(vertexesAndTheirEdges))

            for (let vertexStart in vertexesAndTheirEdges) {
                this.addVertexEdges(vertexStart, vertexesAndTheirEdges[vertexStart]);
            }
        },
        getMatrix: function () {
            return matrix;
        },
        getAllVertexes: function () {
            return Object.keys(matrix);
        },
        getAllEdges: function () {
            const edges = [];
            for (let vertex in matrix) {
                for (let vertexStart in matrix[vertex]) {
                    edges.push({
                        from: vertex,
                        to: vertexStart,
                        weight: matrix[vertex][vertexStart]
                    });
                }
            }

            return edges;
        },
        /**
         * Get shortest way by Dijkstra algorithm.
         * @param {number} startVertex
         * @param {number} endVertex
         */
        getShortestWay(startVertex, endVertex) {
            if (matrix[startVertex] === undefined || matrix[endVertex] === undefined) {
                throw new Error("One of the vertexes doesn't exist.");
            }

            let shortedWay;

            const allWays = [];
            for (let index in matrix[startVertex]) {
                allWays[startVertex.toString() + index.toString()] = {
                    'vertexes': [startVertex, index],
                    'weight': matrix[startVertex][index]
                };
            }

            function analizeAllWaysItems() {
                for (let i in allWays) {
                    lastVertex = allWays[i].vertexes.slice(-1)[0];

                    if (lastVertex === endVertex) {
                        if (shortedWay === undefined || shortedWay.weight > allWays[i].weight) {
                            shortedWay = allWays[i];
                        }
                    } else {
                        analizeOneItemOfAllWays(i);
                    }
                    delete allWays[i];
                }
            }

            function analizeOneItemOfAllWays(itemIndex) {
                for (let j in matrix[lastVertex]) {

                    if (!allWays[itemIndex].vertexes.includes(j)) {
                        let vertexes = [...allWays[itemIndex].vertexes];
                        vertexes.push(j);

                        let weight = allWays[itemIndex].weight + matrix[lastVertex][j];
                        allWays[itemIndex + j.toString()] = {
                            'vertexes': vertexes,
                            'weight': weight
                        };
                    }
                }
            }

            while (Object.keys(allWays).length !== 0) {
                analizeAllWaysItems();
            }

            return shortedWay;
        },
        /**
         * Get shortest way to all vertexes by Bellman-Ford algorithm.
         * @param {number} startVertex
         */
        getAllWaysFromVertex: function (startVertex) {
            if (matrix[startVertex] === undefined) {
                throw new Error("One of the vertexes doesn't exist.");
            }

            const distances = [];
            for (let vertex in matrix) {
                distances[vertex] = {
                    vertexes: [],
                    weight: Infinity
                };
            }
            distances[startVertex] = {
                vertexes: [],
                weight: 0
            };
            const edges = this.getAllEdges();

            for (let i in distances) {
                for (let j in edges) {
                    if (distances[edges[j].from].weight + edges[j].weight < distances[edges[j].to].weight) {
                        distances[edges[j].to].weight = distances[edges[j].from].weight + edges[j].weight;
                        distances[edges[j].to].vertexes = [...distances[edges[j].from].vertexes];
                        distances[edges[j].to].vertexes.push(edges[j].to);
                    }
                }
            }

            return distances;
        }
    }
}

const graph1 = new Graph();
graph1.addVertex('a');
graph1.addVertex('b');
graph1.addVertex('c');
graph1.addVertex('d');
graph1.addVertexes(['e', 'f']);
graph1.addEdge('e', 'c', 1);

const vertexEdges = {'e': 1, 'd': 1};
graph1.addVertexEdges('a', vertexEdges);
graph1.deleteVertexes(['d']);

console.log("Tested graph: ");
console.log(graph1.getMatrix());

const graph2 = new Graph();
const vertexesAndTheirEdges = {
    'a': {'d': 1},
    'b': {'e': 1},
    'c': {'d': 1},
    'd': {'f': 1, 'l': 1, 'h': 7},
    'l': {'h': 4},
    'f': {'e': 1, 'h': 4},
    'e': {'g': 1, 't': 1},
    'g': {'h': 2},
    't': {'h': 1},
    'h': {'k': 1},
    'k': {}
};
graph2.addVertexesAndTheirEdges(vertexesAndTheirEdges);

console.log("\nGet shortest way by Dijkstra algorithm: ");
console.log(graph2.getShortestWay('a', 'h', 2));

console.log("\nGet shortest way from vertex to all vertexes by Bellman-Ford algorithm: ");
console.log(graph2.getAllWaysFromVertex('a'));