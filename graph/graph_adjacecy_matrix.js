function Graph() {
    const adjacencyMatrix = [];

    return {
        /**
         * Add new vertex to graph
         * @param {number} vertexIndex
         */
        addVertex: function (vertexIndex) {
            if (adjacencyMatrix[vertexIndex] !== undefined) {
                throw new Error("This vertex already exist.");
            }

            adjacencyMatrix[vertexIndex] = [];
            for (let key of Object.keys(adjacencyMatrix)) {
                adjacencyMatrix[key][vertexIndex] = 0;
                adjacencyMatrix[vertexIndex][key] = 0;
            }
        },
        /**
         * Add new edge to graph
         * @param {number} from. Start edge vertex.
         * @param {number} to. End edge vertex.
         * @param {number} weight. Edge's weight
         */
        addEdge: function (from, to, weight) {
            if (adjacencyMatrix[from] === undefined || adjacencyMatrix[to] === undefined) {
                throw new Error("One of the vertexes doesn't exist.");
            }
            adjacencyMatrix[from][to] = weight;
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
            if (adjacencyMatrix[vertexIndex] === undefined) {
                throw new Error("This vertex doesn't exist.");
            }

            delete adjacencyMatrix[vertexIndex];
            adjacencyMatrix.forEach((value, index) => {
                delete adjacencyMatrix[index][vertexIndex];
            });
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
        getAdjacencyMatrix: function () {
            return adjacencyMatrix;
        },
    }
}

const graph1 = new Graph();
graph1.addVertex(0);
graph1.addVertex(1);
graph1.addVertex(2);
graph1.addVertex(3);
graph1.addVertexes([4, 5]);
graph1.addEdge(4, 2, 1);

const vertexEdges = {1: 1, 3: 1};
graph1.addVertexEdges(0, vertexEdges);

const graph2 = new Graph();

const vertexesAndTheirEdges = {
    1: {4: 1},
    2: {7: 1},
    3: {4: 1},
    4: {5: 1},
    5: {7: 1, 8: 1},
    6: {9: 1},
    7: {6: 1},
    8: {9: 1},
    9: {}
};
graph2.addVertexesAndTheirEdges(vertexesAndTheirEdges);
console.log(graph2.getAdjacencyMatrix());