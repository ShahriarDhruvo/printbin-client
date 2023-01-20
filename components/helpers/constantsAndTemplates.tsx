import { customAlphabet } from "nanoid";
import { FilesT, ToastT } from "./types";

export const MIN_DATE = "2023-01-01T00:00";
export const BASE_DURATION_FORMAT = "00:00.000";
export const CURRENT_DATE = new Date().toLocaleString("sv-SE", {
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    month: "numeric",
    minute: "2-digit",
});

export const EXAMPLE_CODE = `// Red Black Tree implementation in C++
// Author: Algorithm Tutor
// Tutorial URL: https://algorithmtutor.com/Data-Structures/Tree/Red-Black-Trees/

#include <iostream>

using namespace std;

// data structure that represents a node in the tree
struct Node {
	int data; // holds the key
	Node *parent; // pointer to the parent
	Node *left; // pointer to left child
	Node *right; // pointer to right child
	int color; // 1 -> Red, 0 -> Black
};

typedef Node *NodePtr;

// class RBTree implements the operations in Red Black Tree
class RBTree {
private:
	NodePtr root;
	NodePtr TNULL;

	// initializes the nodes with appropirate values
	// all the pointers are set to point to the null pointer
	void initializeNULLNode(NodePtr node, NodePtr parent) {
		node->data = 0;
		node->parent = parent;
		node->left = nullptr;
		node->right = nullptr;
		node->color = 0;
	}

	void preOrderHelper(NodePtr node) {
		if (node != TNULL) {
			cout<<node->data<<" ";
			preOrderHelper(node->left);
			preOrderHelper(node->right);
		} 
	}

	void inOrderHelper(NodePtr node) {
		if (node != TNULL) {
			inOrderHelper(node->left);
			cout<<node->data<<" ";
			inOrderHelper(node->right);
		} 
	}

	void postOrderHelper(NodePtr node) {
		if (node != TNULL) {
			postOrderHelper(node->left);
			postOrderHelper(node->right);
			cout<<node->data<<" ";
		} 
	}

	NodePtr searchTreeHelper(NodePtr node, int key) {
		if (node == TNULL || key == node->data) {
			return node;
		}

		if (key < node->data) {
			return searchTreeHelper(node->left, key);
		} 
		return searchTreeHelper(node->right, key);
	}

	// fix the rb tree modified by the delete operation
	void fixDelete(NodePtr x) {
		NodePtr s;
		while (x != root && x->color == 0) {
			if (x == x->parent->left) {
				s = x->parent->right;
				if (s->color == 1) {
					// case 3.1
					s->color = 0;
					x->parent->color = 1;
					leftRotate(x->parent);
					s = x->parent->right;
				}

				if (s->left->color == 0 && s->right->color == 0) {
					// case 3.2
					s->color = 1;
					x = x->parent;
				} else {
					if (s->right->color == 0) {
						// case 3.3
						s->left->color = 0;
						s->color = 1;
						rightRotate(s);
						s = x->parent->right;
					} 

					// case 3.4
					s->color = x->parent->color;
					x->parent->color = 0;
					s->right->color = 0;
					leftRotate(x->parent);
					x = root;
				}
			} else {
				s = x->parent->left;
				if (s->color == 1) {
					// case 3.1
					s->color = 0;
					x->parent->color = 1;
					rightRotate(x->parent);
					s = x->parent->left;
				}

				if (s->right->color == 0 && s->right->color == 0) {
					// case 3.2
					s->color = 1;
					x = x->parent;
				} else {
					if (s->left->color == 0) {
						// case 3.3
						s->right->color = 0;
						s->color = 1;
						leftRotate(s);
						s = x->parent->left;
					} 

					// case 3.4
					s->color = x->parent->color;
					x->parent->color = 0;
					s->left->color = 0;
					rightRotate(x->parent);
					x = root;
				}
			} 
		}
		x->color = 0;
	}


	void rbTransplant(NodePtr u, NodePtr v){
		if (u->parent == nullptr) {
			root = v;
		} else if (u == u->parent->left){
			u->parent->left = v;
		} else {
			u->parent->right = v;
		}
		v->parent = u->parent;
	}

	void deleteNodeHelper(NodePtr node, int key) {
		// find the node containing key
		NodePtr z = TNULL;
		NodePtr x, y;
		while (node != TNULL){
			if (node->data == key) {
				z = node;
			}

			if (node->data <= key) {
				node = node->right;
			} else {
				node = node->left;
			}
		}

		if (z == TNULL) {
			cout<<"Couldn't find key in the tree"<<endl;
			return;
		} 

		y = z;
		int y_original_color = y->color;
		if (z->left == TNULL) {
			x = z->right;
			rbTransplant(z, z->right);
		} else if (z->right == TNULL) {
			x = z->left;
			rbTransplant(z, z->left);
		} else {
			y = minimum(z->right);
			y_original_color = y->color;
			x = y->right;
			if (y->parent == z) {
				x->parent = y;
			} else {
				rbTransplant(y, y->right);
				y->right = z->right;
				y->right->parent = y;
			}

			rbTransplant(z, y);
			y->left = z->left;
			y->left->parent = y;
			y->color = z->color;
		}
		delete z;
		if (y_original_color == 0){
			fixDelete(x);
		}
	}
	
	// fix the red-black tree
	void fixInsert(NodePtr k){
		NodePtr u;
		while (k->parent->color == 1) {
			if (k->parent == k->parent->parent->right) {
				u = k->parent->parent->left; // uncle
				if (u->color == 1) {
					// case 3.1
					u->color = 0;
					k->parent->color = 0;
					k->parent->parent->color = 1;
					k = k->parent->parent;
				} else {
					if (k == k->parent->left) {
						// case 3.2.2
						k = k->parent;
						rightRotate(k);
					}
					// case 3.2.1
					k->parent->color = 0;
					k->parent->parent->color = 1;
					leftRotate(k->parent->parent);
				}
			} else {
				u = k->parent->parent->right; // uncle

				if (u->color == 1) {
					// mirror case 3.1
					u->color = 0;
					k->parent->color = 0;
					k->parent->parent->color = 1;
					k = k->parent->parent;	
				} else {
					if (k == k->parent->right) {
						// mirror case 3.2.2
						k = k->parent;
						leftRotate(k);
					}
					// mirror case 3.2.1
					k->parent->color = 0;
					k->parent->parent->color = 1;
					rightRotate(k->parent->parent);
				}
			}
			if (k == root) {
				break;
			}
		}
		root->color = 0;
	}

	void printHelper(NodePtr root, string indent, bool last) {
		// print the tree structure on the screen
	   	if (root != TNULL) {
		   cout<<indent;
		   if (last) {
		      cout<<"R----";
		      indent += "     ";
		   } else {
		      cout<<"L----";
		      indent += "|    ";
		   }
            
           string sColor = root->color?"RED":"BLACK";
		   cout<<root->data<<"("<<sColor<<")"<<endl;
		   printHelper(root->left, indent, false);
		   printHelper(root->right, indent, true);
		}
		// cout<<root->left->data<<endl;
	}

public:
	RBTree() {
		TNULL = new Node;
		TNULL->color = 0;
		TNULL->left = nullptr;
		TNULL->right = nullptr;
		root = TNULL;
	}

	// Pre-Order traversal
	// Node->Left Subtree->Right Subtree
	void preorder() {
		preOrderHelper(this->root);
	}

	// In-Order traversal
	// Left Subtree -> Node -> Right Subtree
	void inorder() {
		inOrderHelper(this->root);
	}

	// Post-Order traversal
	// Left Subtree -> Right Subtree -> Node
	void postorder() {
		postOrderHelper(this->root);
	}

	// search the tree for the key k
	// and return the corresponding node
	NodePtr searchTree(int k) {
		return searchTreeHelper(this->root, k);
	}

	// find the node with the minimum key
	NodePtr minimum(NodePtr node) {
		while (node->left != TNULL) {
			node = node->left;
		}
		return node;
	}

	// find the node with the maximum key
	NodePtr maximum(NodePtr node) {
		while (node->right != TNULL) {
			node = node->right;
		}
		return node;
	}

	// find the successor of a given node
	NodePtr successor(NodePtr x) {
		// if the right subtree is not null,
		// the successor is the leftmost node in the
		// right subtree
		if (x->right != TNULL) {
			return minimum(x->right);
		}

		// else it is the lowest ancestor of x whose
		// left child is also an ancestor of x.
		NodePtr y = x->parent;
		while (y != TNULL && x == y->right) {
			x = y;
			y = y->parent;
		}
		return y;
	}

	// find the predecessor of a given node
	NodePtr predecessor(NodePtr x) {
		// if the left subtree is not null,
		// the predecessor is the rightmost node in the 
		// left subtree
		if (x->left != TNULL) {
			return maximum(x->left);
		}

		NodePtr y = x->parent;
		while (y != TNULL && x == y->left) {
			x = y;
			y = y->parent;
		}

		return y;
	}

	// rotate left at node x
	void leftRotate(NodePtr x) {
		NodePtr y = x->right;
		x->right = y->left;
		if (y->left != TNULL) {
			y->left->parent = x;
		}
		y->parent = x->parent;
		if (x->parent == nullptr) {
			this->root = y;
		} else if (x == x->parent->left) {
			x->parent->left = y;
		} else {
			x->parent->right = y;
		}
		y->left = x;
		x->parent = y;
	}

	// rotate right at node x
	void rightRotate(NodePtr x) {
		NodePtr y = x->left;
		x->left = y->right;
		if (y->right != TNULL) {
			y->right->parent = x;
		}
		y->parent = x->parent;
		if (x->parent == nullptr) {
			this->root = y;
		} else if (x == x->parent->right) {
			x->parent->right = y;
		} else {
			x->parent->left = y;
		}
		y->right = x;
		x->parent = y;
	}

	// insert the key to the tree in its appropriate position
	// and fix the tree
	void insert(int key) {
		// Ordinary Binary Search Insertion
		NodePtr node = new Node;
		node->parent = nullptr;
		node->data = key;
		node->left = TNULL;
		node->right = TNULL;
		node->color = 1; // new node must be red

		NodePtr y = nullptr;
		NodePtr x = this->root;

		while (x != TNULL) {
			y = x;
			if (node->data < x->data) {
				x = x->left;
			} else {
				x = x->right;
			}
		}

		// y is parent of x
		node->parent = y;
		if (y == nullptr) {
			root = node;
		} else if (node->data < y->data) {
			y->left = node;
		} else {
			y->right = node;
		}

		// if new node is a root node, simply return
		if (node->parent == nullptr){
			node->color = 0;
			return;
		}

		// if the grandparent is null, simply return
		if (node->parent->parent == nullptr) {
			return;
		}

		// Fix the tree
		fixInsert(node);
	}

	NodePtr getRoot(){
		return this->root;
	}

	// delete the node from the tree
	void deleteNode(int data) {
		deleteNodeHelper(this->root, data);
	}

	// print the tree structure on the screen
	void prettyPrint() {
	    if (root) {
    		printHelper(this->root, "", true);
	    }
	}

};

int main() {
	RBTree bst;
	bst.insert(8);
	bst.insert(18);
	bst.insert(5);
	bst.insert(15);
	bst.insert(17);
	bst.insert(25);
	bst.insert(40);
	bst.insert(80);
	bst.deleteNode(25);
	bst.prettyPrint();
	return 0;
}`;

export const ROOM_COUNT = 7;
export const genID = customAlphabet("0123456789abcdefghijklmnpqrstuvwxyz", 8);
export const RANDOM_AVATAR =
    "https://api.dicebear.com/5.x/micah/svg?seed=" +
    (Math.random() + 1).toString(36).substring(7);

export const ToastDV: ToastT = {
    duration: 5000,
    isClosable: true,
    variant: "solid",
    status: "warning",
    position: "top-right",
    containerStyle: {
        fontWeight: "500",
    },
    description: "An error has occurred, try again later!",
};

export const TableStateDV = {
    page: 1,
    limit: 30,
    search: "",
    to: CURRENT_DATE,
    from: CURRENT_DATE,
};

export const API_ENDPOINTS = (): any => {
    const ROOT = process.env.NEXT_PUBLIC_BACKEND_URL ?? "/error";

    const USER = ROOT + "/v1/user";
    const AUTH = ROOT + "/v1/auth";
    const ADMIN = ROOT + "/v1/admin";
    const RECORDING = ROOT + "/v1/recording";
    const ANNOTATION = ROOT + "/v1/annotation";
    const VALIDATION = ROOT + "/v1/validation";

    return {
        root: ROOT,
        is_auth: ROOT + "/v1/isAuth", //
        auth: {
            base: AUTH,
            login: AUTH + "/login", //
        },
        admin: {
            base: ADMIN,
            texts: ADMIN + "/texts",
            summary: ADMIN + "/summary",
            recording: ADMIN + "/recording",
        },
        user: {
            base: USER,
            summary: USER + "/summary",
            logout: ROOT + "/v1/logout",
        },
        recording: {
            base: RECORDING,
            submit: RECORDING + "/submit",
        },
        annotation: {
            base: ANNOTATION,
            reset: ANNOTATION + "/reset",
            update: ANNOTATION + "/update",
            submit: ANNOTATION + "/submit",
        },
        validation: {
            base: VALIDATION,
            reset: VALIDATION + "/reset",
            update: VALIDATION + "/update",
            submit_metadata: VALIDATION + "/metadata",
            submit_annotation: VALIDATION + "/annotation",
        },
    };
};

export const IMG_URLS = (): any => {
    const ROOT = "/img";
    const NAVBAR = ROOT + "/navbar/";
    const OTHERS = ROOT + "/others/";
    const PEOPLE = ROOT + "/people/";
    const SECTIONS = ROOT + "/sections/";
    const FEATURES = ROOT + "/features/";
    const ORGANIZATIONS = ROOT + "/organizations/";

    return {
        features: {
            record: FEATURES + "record.png",
            annotate: FEATURES + "annotate.png",
            validate: FEATURES + "validate.png",
            activity: FEATURES + "activity.png",
            upload_text: FEATURES + "upload_text.png", // //
            pending_files: FEATURES + "pending_files.png", // //
            completed_files: FEATURES + "completed_files.png", // //
        },
        navbar: {
            title: NAVBAR + "title.png",
            languages: NAVBAR + "languages.png",
        },
        others: {
            edit: OTHERS + "edit.png",
            skip: OTHERS + "skip.png",
            admin: OTHERS + "admin.png", // //
            sign_in: OTHERS + "sign_in.png", // //
            record: OTHERS + "record.png",
            cancel: OTHERS + "cancel.png",
            publish: OTHERS + "publish.png",
            download: OTHERS + "download.png",
            rerecord: OTHERS + "rerecord.png",
            metadata: OTHERS + "metadata.png",
            analytics: OTHERS + "analytics.png",
            statistics: OTHERS + "statistics.png",
            stop_record: OTHERS + "stop_record.png",
            add_caption: OTHERS + "add_caption.png",
            telepromter: OTHERS + "telepromter.png",
            information: OTHERS + "information.png",
            switch_camera: OTHERS + "switch_camera.png",
        },
        sections: {
            people: SECTIONS + "people.png",
            organization: SECTIONS + "organization.png",
        },
        organizations: {
            du: ORGANIZATIONS + "du.svg",
            sust: ORGANIZATIONS + "sust.png",
            bracu: ORGANIZATIONS + "bracu.svg",
            bengali_ai: ORGANIZATIONS + "bengali_ai.jpg",
        },
        people: {
            tashfi: PEOPLE + "tashfi.jpg",
            dhruvo: PEOPLE + "dhruvo.jpg",
            sabbir_ahmed: PEOPLE + "sabbir_ahmed.jpg",
            asif_sushmit: PEOPLE + "asif_sushmit.jpg",
            sazia_mehnaz: PEOPLE + "sazia_mehnaz.jpg",
            manash_mandal: PEOPLE + "manash_mandal.jpg",
            sayma_sultana: PEOPLE + "sayma_sultana.jpg",
            farig_sadeque: PEOPLE + "farig_sadeque.jpg",
            rezwana_sultana: PEOPLE + "rezwana_sultana.png",
        },
    };
};

export const DUMMY_FILES: FilesT[] = [
    {
        id: genID(),
        room_number: 3,
        status: "pending",
        team_name: "SUST_N00bs!",
        time: "2012-01-26T13:51:50.417-07:00",
    },
    {
        id: genID(),
        room_number: 5,
        status: "pending",
        team_name: "SsST_N00bs!",
        time: "2012-01-26T13:51:50.417-07:00",
    },
    {
        id: genID(),
        room_number: 8,
        status: "completed",
        team_name: "SUST_Ndasjbs!",
        time: "2012-01-26T13:51:50.417-07:00",
    },
    {
        id: genID(),
        room_number: 2,
        status: "pending",
        team_name: "SUST_dsd0bs!",
        time: "2012-01-26T13:51:50.417-07:00",
    },
    {
        id: genID(),
        room_number: 1,
        status: "completed",
        team_name: "AKJDKSJ&&",
        time: "2012-01-26T13:51:50.417-07:00",
    },
];
