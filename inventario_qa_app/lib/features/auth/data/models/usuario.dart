enum UserRole { admin, cliente }

UserRole roleFromString(String value) {
  switch (value.toUpperCase()) {
    case 'ADMIN':
      return UserRole.admin;
    case 'CLIENTE':
    default:
      return UserRole.cliente;
  }
}

String roleToString(UserRole role) =>
    role == UserRole.admin ? 'ADMIN' : 'CLIENTE';

class Usuario {
  final int id;
  final String nombre;
  final String email;
  final UserRole rol;

  const Usuario({
    required this.id,
    required this.nombre,
    required this.email,
    required this.rol,
  });

  factory Usuario.fromJson(Map<String, dynamic> json) {
    return Usuario(
      id: (json['id'] as num).toInt(),
      nombre: json['nombre'] as String,
      email: json['email'] as String,
      rol: roleFromString(json['rol'] as String? ?? 'CLIENTE'),
    );
  }

  Map<String, dynamic> toJson() => {
        'id': id,
        'nombre': nombre,
        'email': email,
        'rol': roleToString(rol),
      };

  bool get isAdmin => rol == UserRole.admin;
}

class AuthResult {
  final String token;
  final Usuario usuario;

  const AuthResult({required this.token, required this.usuario});
}
