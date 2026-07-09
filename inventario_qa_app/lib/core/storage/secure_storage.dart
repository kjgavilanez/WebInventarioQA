import 'package:flutter_secure_storage/flutter_secure_storage.dart';

class SecureStorage {
  static const _storage = FlutterSecureStorage(
    aOptions: AndroidOptions(encryptedSharedPreferences: true),
  );

  static const _kToken = 'token';
  static const _kUsuario = 'usuario';

  Future<String?> getToken() => _storage.read(key: _kToken);

  Future<void> saveToken(String token) =>
      _storage.write(key: _kToken, value: token);

  Future<String?> getUsuarioJson() => _storage.read(key: _kUsuario);

  Future<void> saveUsuarioJson(String json) =>
      _storage.write(key: _kUsuario, value: json);

  Future<void> clearAll() async {
    await _storage.delete(key: _kToken);
    await _storage.delete(key: _kUsuario);
  }
}
